"use client";

import { useState, useCallback } from "react";
import type { UploadedFile } from "@/lib/types";
import { MAX_UPLOAD_SIZE_MB, SUPPORTED_FILE_TYPES } from "@/lib/constants";
import { calculateModelSize } from "@/services/print-file.api";

const MAX_SIZE = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

function validateFile(file: File): string | null {
  const extension = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");

  if (!SUPPORTED_FILE_TYPES.includes(extension)) {
    return `${file.name}: định dạng ${extension} chưa hỗ trợ báo giá tự động. Vui lòng xuất file sang STL.`;
  }
  if (file.size > MAX_SIZE) {
    return `${file.name}: file quá lớn (${(file.size / 1024 / 1024).toFixed(1)}MB). Giới hạn: ${MAX_UPLOAD_SIZE_MB}MB.`;
  }
  return null;
}

/** Gửi file lên backend để đọc thể tích + kích thước thật */
async function analyzeFile(file: File): Promise<UploadedFile> {
  const size = await calculateModelSize(file);
  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
    file,
    dimensions: { x: size.width, y: size.depth, z: size.height },
    volume: size.volume / 1000, // mm³ → cm³
  };
}

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = useCallback(async (newFiles: File[]) => {
    setIsUploading(true);
    setError(null);

    const errors: string[] = [];
    const validFiles = newFiles.filter((file) => {
      const validationError = validateFile(file);
      if (validationError) errors.push(validationError);
      return !validationError;
    });

    const results = await Promise.allSettled(validFiles.map(analyzeFile));
    const uploaded: UploadedFile[] = [];
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        uploaded.push(result.value);
      } else {
        const reason =
          result.reason instanceof Error ? result.reason.message : "";
        errors.push(
          `${validFiles[index].name}: không đọc được mô hình${reason ? ` (${reason})` : ""}.`
        );
      }
    });

    setFiles((prev) => [...prev, ...uploaded]);
    if (errors.length > 0) setError(errors.join("\n"));
    setIsUploading(false);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const clearFiles = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.url));
      return [];
    });
    setError(null);
  }, []);

  return {
    files,
    isUploading,
    error,
    uploadFiles,
    removeFile,
    clearFiles,
    clearError,
  };
}
