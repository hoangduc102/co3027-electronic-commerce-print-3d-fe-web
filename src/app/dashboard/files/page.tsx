"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Download,
  FileBox,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useDeletePrintFile, useMyPrintFiles } from "@/hooks/use-print-files";
import {
  printFileDisplayName,
  printFileUploadedAt,
  reorderPrintFile,
} from "@/lib/custom-print";
import { formatPrice } from "@/lib/utils";
import { API_CONFIG } from "@/config/api.config";
import { type Product, variantUnitPrice } from "@/schemas/product.schema";

const formatDimensions = (product: Product) => {
  const f = product.printFile;
  if (!f?.width || !f.depth || !f.height) return "—";
  return `${f.width.toFixed(0)}×${f.depth.toFixed(0)}×${f.height.toFixed(0)} mm`;
};

const unitPrice = (product: Product) =>
  product.variants[0]
    ? Math.round(variantUnitPrice(product, product.variants[0]))
    : null;

export default function FilesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const { data: files = [], isLoading, isError, error } = useMyPrintFiles();
  const deleteFile = useDeletePrintFile();
  const { addToCart } = useCart();

  const filteredFiles = files.filter((product) =>
    printFileDisplayName(product)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleReorder = (product: Product) => {
    const item = reorderPrintFile(product);
    if (!item) return;
    addToCart(item);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteFile.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const renderActions = (product: Product) => (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        className="border-foreground gap-1 bg-transparent"
        disabled={!product.variants[0]}
        onClick={() => handleReorder(product)}
      >
        {addedId === product.id ? (
          <>
            <Check className="h-3 w-3" /> Đã thêm
          </>
        ) : (
          <>
            <RefreshCw className="h-3 w-3" /> In lại
          </>
        )}
      </Button>
      {product.printFile && (
        <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
          <a
            href={`${API_CONFIG.BASE_URL}${product.printFile.url}`}
            download
            title="Tải file"
          >
            <Download className="h-4 w-4" />
          </a>
        </Button>
      )}
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-red-500 hover:text-red-600"
        onClick={() => {
          deleteFile.reset();
          setDeleteTarget(product);
        }}
        title="Xoá"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
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
          <p className="text-muted-foreground">{files.length} file đã lưu</p>
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm file..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-2 border-foreground"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center py-16 text-destructive">
          <AlertCircle className="h-10 w-10 mb-2" />
          <p>{(error as Error).message}</p>
        </div>
      ) : filteredFiles.length > 0 ? (
        <div className="border-2 border-foreground bg-card">
          <div className="hidden md:grid grid-cols-[1fr_150px_110px_110px_170px] gap-4 p-4 border-b-2 border-foreground bg-secondary text-sm font-medium">
            <span>Tên file</span>
            <span>Kích thước</span>
            <span>Đơn giá</span>
            <span>Ngày tải lên</span>
            <span className="text-right">Thao tác</span>
          </div>

          {filteredFiles.map((product, index) => {
            const price = unitPrice(product);
            const uploadedAt = printFileUploadedAt(product);

            return (
              <div
                key={product.id}
                className={`p-4 ${index < filteredFiles.length - 1 ? "border-b-2 border-foreground" : ""}`}
              >
                <div className="flex flex-col gap-3 md:grid md:grid-cols-[1fr_150px_110px_110px_170px] md:gap-4 md:items-center">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0">
                      <FileBox className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {printFileDisplayName(product)}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDimensions(product)}
                  </span>
                  <span className="text-sm font-medium">
                    {price != null ? formatPrice(price) : "—"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {uploadedAt}
                  </span>
                  {renderActions(product)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-foreground">
          <FileBox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          {files.length === 0 ? (
            <>
              <p className="text-lg font-medium mb-2">Chưa có file nào</p>
              <p className="text-muted-foreground">
                File sẽ được lưu ở đây khi bạn đặt in từ trang báo giá
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium mb-2">Không tìm thấy file</p>
              <p className="text-muted-foreground">
                Thử tìm kiếm với từ khóa khác
              </p>
            </>
          )}
        </div>
      )}

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá file?</DialogTitle>
            <DialogDescription>
              File{" "}
              <strong>
                {deleteTarget ? printFileDisplayName(deleteTarget) : ""}
              </strong>{" "}
              sẽ bị xoá khỏi thư viện. Thao tác này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          {deleteFile.isError && (
            <p className="text-sm text-red-600">
              {(deleteFile.error as Error).message}
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Huỷ
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteFile.isPending}
            >
              {deleteFile.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
