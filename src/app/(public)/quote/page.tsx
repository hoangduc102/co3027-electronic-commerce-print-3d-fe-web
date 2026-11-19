"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FileUploadZone } from "@/components/quote/file-upload-zone";
import { FileCard } from "@/components/quote/file-card";
import { PriceSummary } from "@/components/quote/price-summary";
import { useFileUpload } from "@/hooks/use-file-upload";
import { calculatePrice } from "@/hooks/use-price-calculator";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { createCustomPrintItem, findBackendMaterial } from "@/lib/custom-print";
import { MATERIALS } from "@/lib/constants";
import type { PrintConfig } from "@/lib/types";
import { getMaterials } from "@/services/material.api";

// Metadata được export từ layout.tsx do đây là client component

const defaultConfig: PrintConfig = {
  technology: "FDM",
  material: "pla",
  color: "#FFFFFF",
  infill: 20,
  layerHeight: 0.2,
  quantity: 1,
  scale: 100,
};

type ResultMessage = { type: "success" | "error"; text: string } | null;

export default function QuotePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const {
    files,
    isUploading,
    error,
    uploadFiles,
    removeFile,
    clearFiles,
    clearError,
  } = useFileUpload();
  const [configs, setConfigs] = useState<Record<string, PrintConfig>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ResultMessage>(null);

  // Vật liệu thật ở backend — dùng để tạo variant khi đặt in
  const materialsQuery = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
    staleTime: 5 * 60 * 1000,
  });
  const backendMaterials = materialsQuery.data ?? [];

  const getConfig = (fileId: string): PrintConfig =>
    configs[fileId] ?? defaultConfig;

  const updateConfig = (fileId: string, config: PrintConfig) => {
    setConfigs((prev) => ({ ...prev, [fileId]: config }));
  };

  const handleRemoveFile = (fileId: string) => {
    removeFile(fileId);
    setConfigs(({ [fileId]: _removed, ...rest }) => rest);
  };

  /** Lý do file chưa đặt được với cấu hình hiện tại */
  const getOrderWarning = (fileId: string): string | null => {
    if (!materialsQuery.isSuccess) return null;
    const config = getConfig(fileId);
    if (findBackendMaterial(config, backendMaterials)) return null;
    const name = MATERIALS.find((m) => m.id === config.material)?.name;
    return `Vật liệu ${name ?? config.material} hiện chỉ báo giá tham khảo, chưa đặt online được. Vui lòng chọn vật liệu khác hoặc liên hệ để được hỗ trợ.`;
  };

  const disabledReason = !isAuthenticated
    ? null // vẫn cho bấm để hiện hướng dẫn đăng nhập
    : materialsQuery.isError
      ? "Không tải được danh sách vật liệu, vui lòng thử lại sau."
      : files.some((f) => getOrderWarning(f.id))
        ? "Có file đang chọn vật liệu chưa hỗ trợ đặt online."
        : null;

  /** Tạo sản phẩm in theo yêu cầu cho từng file rồi thêm vào giỏ */
  const handleAddToCart = async (goToCheckout: boolean) => {
    setResult(null);
    if (!isAuthenticated) {
      setResult({
        type: "error",
        text: "Vui lòng đăng nhập để đặt in.",
      });
      return;
    }

    setIsProcessing(true);
    const errors: string[] = [];
    let added = 0;

    // Chạy tuần tự để lỗi ở 1 file không ảnh hưởng các file khác
    for (const file of files) {
      try {
        const item = await createCustomPrintItem(
          file,
          getConfig(file.id),
          backendMaterials
        );
        addToCart(item);
        handleRemoveFile(file.id);
        added++;
      } catch (err) {
        errors.push(
          `${file.name}: ${err instanceof Error ? err.message : "lỗi không xác định"}`
        );
      }
    }

    setIsProcessing(false);

    if (errors.length === 0 && goToCheckout) {
      router.push("/checkout");
      return;
    }
    setResult(
      errors.length > 0
        ? {
            type: "error",
            text: `${added > 0 ? `Đã thêm ${added} file vào giỏ. ` : ""}Không thêm được:\n${errors.join("\n")}`,
          }
        : { type: "success", text: `Đã thêm ${added} file vào giỏ hàng.` }
    );
  };

  const priceItems = files.map((file) => {
    const config = getConfig(file.id);
    return {
      name: file.name,
      quantity: config.quantity,
      price: calculatePrice(file, config),
    };
  });

  const resultMessage = result && (
    <div
      className={`text-sm whitespace-pre-line ${result.type === "error" ? "text-red-600" : "text-green-700"}`}
      role="status"
    >
      {result.text}{" "}
      {result.type === "success" && (
        <Link href="/checkout" className="underline font-medium">
          Xem giỏ hàng
        </Link>
      )}
      {!isAuthenticated && (
        <Link href="/login" className="underline font-medium">
          Đăng nhập
        </Link>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Công cụ Báo giá In 3D
            </h1>
            <p className="text-muted-foreground">
              Upload file STL để nhận báo giá tức thì dựa trên thể tích thật của
              mô hình.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-6">
              <div className="border-2 border-foreground p-6 bg-card">
                <h2 className="font-bold text-xl mb-4 uppercase tracking-wide">
                  Bước 1: Tải lên File
                </h2>
                <p className="text-muted-foreground mb-4">
                  Tải lên file .STL để xem chi phí in theo thời gian thực. File
                  OBJ/STEP/3MF vui lòng xuất sang STL trước.
                </p>
                <FileUploadZone
                  onFilesSelected={uploadFiles}
                  isUploading={isUploading}
                  error={error}
                  onClearError={clearError}
                />
              </div>

              {files.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl uppercase tracking-wide">
                      Bước 2: Cấu hình in
                    </h2>
                    {files.length > 1 && (
                      <button
                        onClick={() => {
                          clearFiles();
                          setConfigs({});
                        }}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Xóa tất cả
                      </button>
                    )}
                  </div>

                  {files.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      config={getConfig(file.id)}
                      onConfigChange={(config) => updateConfig(file.id, config)}
                      onRemove={() => handleRemoveFile(file.id)}
                      orderWarning={getOrderWarning(file.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:self-start">
              <PriceSummary
                items={priceItems}
                onAddToCart={() => void handleAddToCart(false)}
                onCheckoutNow={() => void handleAddToCart(true)}
                isProcessing={isProcessing}
                disabledReason={disabledReason}
                message={resultMessage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
