"use client";

import { useState, useCallback } from "react";
import type { UploadedFile } from "@/lib/types";

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const validExtensions = [".stl", ".obj", ".step", ".3mf", ".stp"];
    const extension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!validExtensions.includes(extension)) {
      return `Định dạng ${extension} không được hỗ trợ. Vui lòng sử dụng: STL, OBJ, STEP, 3MF`;
    }

    if (file.size > maxSize) {
      return `File quá lớn (${(file.size / 1024 / 1024).toFixed(1)}MB). Giới hạn: 100MB`;
    }

    return null;
  };

  const uploadFiles = useCallback(async (newFiles: FileList | File[]) => {
    setIsUploading(true);
    setError(null);

    const fileArray = Array.from(newFiles);
    const uploadedFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      // Simulate file processing
      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        // Mock dimensions - in real app, parse from STL/OBJ
        dimensions: {
          x: Math.random() * 100 + 20,
          y: Math.random() * 100 + 20,
          z: Math.random() * 50 + 10,
        },
        volume: Math.random() * 50 + 5, // cm³
        isManifold: Math.random() > 0.2, // 80% chance of valid mesh
      };

      uploadedFiles.push(uploadedFile);
    }

    setFiles((prev) => [...prev, ...uploadedFiles]);
    setIsUploading(false);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  return {
    files,
    isUploading,
    error,
    uploadFiles,
    removeFile,
    clearFiles,
  };
}
