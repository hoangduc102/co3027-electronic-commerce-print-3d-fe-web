import type { CartItem } from "@/contexts/CartContext";
import { calculatePrice } from "@/hooks/use-price-calculator";
import { MATERIALS } from "@/lib/constants";
import type { PrintConfig, UploadedFile } from "@/lib/types";
import type { BackendMaterial } from "@/services/material.api";
import { uploadPrintFile } from "@/services/print-file.api";
import { productService } from "@/services/product.api";
import { type Product, variantUnitPrice } from "@/schemas/product.schema";

/**
 * Luồng "in theo yêu cầu" từ trang báo giá:
 *   upload STL → tạo Product (isActive=false, gắn printFile) → tạo Variant
 *   với vật liệu tương ứng ở backend → thêm vào giỏ như sản phẩm bình thường.
 *
 * Backend tính đơn giá = basePrice × priceFactor × scale/100, nên ta lưu
 * basePrice = giá báo / priceFactor và gửi scale = 100 (tỉ lệ đã nằm trong giá báo).
 */

/** Tên màu backend (seed) ↔ mã hex FE */
const COLOR_NAMES: Record<string, string> = {
  "#FFFFFF": "white",
  "#F5F5F5": "white",
  "#000000": "black",
  "#FF0000": "red",
  "#00FF00": "green",
  "#0000FF": "blue",
  "#FFFF00": "yellow",
  "#FF6B00": "orange",
  "#808080": "gray",
};

/** Tìm vật liệu backend khớp với vật liệu + màu chọn ở FE (null nếu chưa bán online) */
export function findBackendMaterial(
  config: Pick<PrintConfig, "material" | "color">,
  backendMaterials: BackendMaterial[]
): BackendMaterial | null {
  const feMaterial = MATERIALS.find((m) => m.id === config.material);
  if (!feMaterial) return null;

  const sameName = backendMaterials.filter(
    (m) => m.name.toLowerCase() === feMaterial.name.toLowerCase()
  );
  const colorName = COLOR_NAMES[config.color.toUpperCase()];
  return (
    sameName.find((m) => m.color?.toLowerCase() === colorName) ??
    sameName[0] ??
    null
  );
}

export type CustomPrintCartItem = Omit<CartItem, "id">;

export async function createCustomPrintItem(
  file: UploadedFile,
  config: PrintConfig,
  backendMaterials: BackendMaterial[]
): Promise<CustomPrintCartItem> {
  // Tỉ lệ hợp lệ 10–500% (ô nhập có thể chưa được chuẩn hoá)
  config = {
    ...config,
    scale: Math.min(500, Math.max(10, Math.round(config.scale) || 100)),
  };
  const feMaterial = MATERIALS.find((m) => m.id === config.material);
  const material = findBackendMaterial(config, backendMaterials);
  if (!feMaterial || !material) {
    throw new Error(
      `Vật liệu ${feMaterial?.name ?? config.material} hiện chưa hỗ trợ đặt online`
    );
  }

  // Giá cho 1 bản in (đã gồm tỉ lệ, infill, layer height)
  const quotedUnitPrice = calculatePrice(file, {
    ...config,
    quantity: 1,
  }).total;
  if (quotedUnitPrice <= 0) {
    throw new Error("Không tính được giá cho file này");
  }

  const priceFactor = material.priceFactor ?? 1;
  const basePrice = Math.round((quotedUnitPrice / priceFactor) * 100) / 100;
  // Đúng công thức backend dùng khi tạo đơn → giá trong giỏ khớp tổng tiền đơn
  const unitPrice = Math.round(basePrice * priceFactor);

  const printFile = await uploadPrintFile(file.file);

  const specsSummary = `${config.technology} • ${config.infill}% infill • ${config.layerHeight}mm`;
  const product = await productService.create({
    name: `In theo yêu cầu - ${file.name}`.slice(0, 255),
    description: `Tỉ lệ ${config.scale}% • ${specsSummary}`,
    basePrice,
    isActive: false, // không hiện trong cửa hàng
    printFileId: printFile.id,
  });

  const scaledVolumeMm3 =
    (file.volume ?? 0) * 1000 * Math.pow(config.scale / 100, 3);
  const materialLabel = [material.name, material.color]
    .filter(Boolean)
    .join(" ");

  const variant = await productService.createVariant({
    productId: product.id,
    materialId: material.id,
    name: `${materialLabel} • ${config.infill}% • ${config.layerHeight}mm`.slice(
      0,
      100
    ),
    volume: Math.round(scaledVolumeMm3 * 100) / 100,
    stock: 0,
  });

  return {
    variantId: variant.id,
    name: file.name,
    image: "/placeholder.svg",
    price: unitPrice,
    quantity: config.quantity,
    scale: 100,
    specs: {
      material: materialLabel,
      color: config.color,
      size: `${config.scale}% • ${config.infill}% • ${config.layerHeight}mm`,
    },
  };
}

const CUSTOM_PRINT_PREFIX = "In theo yêu cầu - ";

/** Tên hiển thị của file in (bỏ tiền tố tự thêm khi tạo sản phẩm) */
export function printFileDisplayName(product: Product): string {
  return product.name.startsWith(CUSTOM_PRINT_PREFIX)
    ? product.name.slice(CUSTOM_PRINT_PREFIX.length)
    : product.name;
}

/** Đặt in lại 1 file đã lưu với đúng cấu hình đã chọn lần trước */
export function reorderPrintFile(product: Product): CustomPrintCartItem | null {
  const variant = product.variants[0];
  if (!variant) return null;
  return {
    variantId: variant.id,
    name: printFileDisplayName(product),
    image: "/placeholder.svg",
    price: Math.round(variantUnitPrice(product, variant)),
    quantity: 1,
    scale: 100,
    specs: {
      material: variant.material?.name ?? variant.name,
      color: variant.material?.color || "Theo vật liệu",
      size: product.description ?? variant.name,
    },
  };
}

/** Ngày tải file lên (định dạng vi-VN), "—" nếu không rõ */
export function printFileUploadedAt(product: Product): string {
  const date = product.printFile?.createdAt ?? product.createdAt;
  return date ? new Date(date).toLocaleDateString("vi-VN") : "—";
}
