"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  FileBox,
  Search,
  Upload,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

// Mock data
const savedFiles = [
  {
    id: "1",
    name: "custom_part_v2.stl",
    uploadedAt: new Date("2024-11-15"),
    size: "2.4 MB",
    lastPrinted: new Date("2024-11-20"),
    printCount: 3,
  },
  {
    id: "2",
    name: "logo_3d.obj",
    uploadedAt: new Date("2024-11-10"),
    size: "1.1 MB",
    lastPrinted: new Date("2024-11-12"),
    printCount: 1,
  },
  {
    id: "3",
    name: "phone_case.step",
    uploadedAt: new Date("2024-10-28"),
    size: "5.2 MB",
    lastPrinted: new Date("2024-10-30"),
    printCount: 2,
  },
  {
    id: "4",
    name: "dragon_figure.stl",
    uploadedAt: new Date("2024-10-15"),
    size: "8.7 MB",
    lastPrinted: new Date("2024-10-18"),
    printCount: 1,
  },
  {
    id: "5",
    name: "cabinet_knob_hex.3mf",
    uploadedAt: new Date("2024-09-20"),
    size: "0.8 MB",
    lastPrinted: new Date("2024-12-01"),
    printCount: 5,
  },
];

export default function FilesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = savedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Back Link */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại Dashboard
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Thư viện file</h1>
          <p className="text-muted-foreground">
            {savedFiles.length} file đã lưu
          </p>
        </div>

        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground gap-2"
        >
          <Link href="/quote">
            <Upload className="h-4 w-4" />
            Upload file mới
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm file..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-2 border-foreground"
        />
      </div>

      {/* Files List */}
      {filteredFiles.length > 0 ? (
        <div className="border-2 border-foreground bg-card">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[1fr_100px_120px_100px_120px] gap-4 p-4 border-b-2 border-foreground bg-secondary text-sm font-medium">
            <span>Tên file</span>
            <span>Kích thước</span>
            <span>Ngày tải lên</span>
            <span>Số lần in</span>
            <span className="text-right">Thao tác</span>
          </div>

          {/* File Rows */}
          {filteredFiles.map((file, index) => (
            <div
              key={file.id}
              className={`p-4 ${
                index < filteredFiles.length - 1
                  ? "border-b-2 border-foreground"
                  : ""
              }`}
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-[1fr_100px_120px_100px_120px] gap-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0">
                    <FileBox className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium truncate">{file.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {file.size}
                </span>
                <span className="text-sm text-muted-foreground">
                  {file.uploadedAt.toLocaleDateString("vi-VN")}
                </span>
                <span className="text-sm">{file.printCount} lần</span>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-foreground gap-1 bg-transparent"
                  >
                    <RefreshCw className="h-3 w-3" />
                    In lại
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0">
                      <FileBox className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.size} •{" "}
                        {file.uploadedAt.toLocaleDateString("vi-VN")} •{" "}
                        {file.printCount} lần in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-foreground text-xs bg-transparent"
                    >
                      In lại
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-foreground">
          <FileBox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Không tìm thấy file</p>
          <p className="text-muted-foreground">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  );
}
