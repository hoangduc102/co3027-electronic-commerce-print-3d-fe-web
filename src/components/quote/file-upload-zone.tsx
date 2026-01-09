"use client";

import type React from "react";

import { useCallback, useState } from "react";
import { Upload, FileType, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUPPORTED_FILE_TYPES } from "@/lib/constants";

interface FileUploadZoneProps {
  onFilesSelected: (files: FileList) => void;
  isUploading: boolean;
  error: string | null;
  onClearError: () => void;
}

export function FileUploadZone({
  onFilesSelected,
  isUploading,
  error,
  onClearError,
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        onFilesSelected(e.dataTransfer.files);
      }
    },
    [onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesSelected(e.target.files);
      }
    },
    [onFilesSelected]
  );

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative border-2 border-dashed p-8 md:p-12 text-center transition-colors cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-foreground hover:border-primary",
          isUploading && "opacity-50 pointer-events-none"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept={SUPPORTED_FILE_TYPES.join(",")}
          className="hidden"
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>

          <div>
            <p className="text-lg font-medium mb-1">
              {isUploading ? "Đang tải lên..." : "Kéo thả file vào đây"}
            </p>
            <p className="text-sm text-muted-foreground">
              hoặc click để chọn file từ máy tính
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileType className="h-4 w-4" />
            <span>Hỗ trợ: {SUPPORTED_FILE_TYPES.join(", ").toUpperCase()}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border-2 border-destructive text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="flex-1 text-sm">{error}</p>
          <button
            onClick={onClearError}
            className="p-1 hover:bg-destructive/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
