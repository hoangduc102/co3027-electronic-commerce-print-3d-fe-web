import { z } from "zod";

// --- Sub-Schemas for Relations ---
export const ProductImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable().optional(),
});

const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

/**
 * Backend trả tag theo 2 dạng:
 * - GET /products      → { tag: { id, name } }
 * - GET /products/:id  → { id, name }
 * Chuẩn hoá về { id, name }.
 */
export const ProductTagSchema = z
  .union([z.object({ tag: TagSchema }), TagSchema])
  .transform((t) => ("tag" in t ? t.tag : t));

export const ProductVariantSchema = z.object({
  id: z.string(),
  name: z.string().optional().default(""),
  stock: z.number().int().optional().default(0),
  /** Chỉ có ở GET /products/:id (basePrice * material.priceFactor) */
  price: z.coerce.number().optional(),
  material: z
    .object({
      id: z.string().optional(),
      name: z.string(),
      color: z.string().nullable().optional(),
      priceFactor: z.number().nullable().optional(),
    })
    .optional(),
});

export const ProductPrintFileSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: z.string(),
  volume: z.number().nullable(),
  width: z.number().nullable(),
  depth: z.number().nullable(),
  height: z.number().nullable(),
  createdAt: z.string(),
});

// --- Main Product Schema ---
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  basePrice: z.coerce.number(),
  isActive: z.boolean(),
  images: z.array(ProductImageSchema).optional().default([]),
  tags: z.array(ProductTagSchema).optional().default([]),
  variants: z.array(ProductVariantSchema).optional().default([]),
  /** Có với sản phẩm "in theo yêu cầu" được tạo từ trang báo giá */
  printFile: ProductPrintFileSchema.nullable().optional(),
  createdAt: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type ProductTag = z.infer<typeof ProductTagSchema>;
export type ProductPrintFile = z.infer<typeof ProductPrintFileSchema>;

/** Đơn giá của variant = basePrice × priceFactor (giống cách backend tính) */
export function variantUnitPrice(product: Product, variant: ProductVariant) {
  if (variant.price != null) return variant.price;
  return product.basePrice * (variant.material?.priceFactor ?? 1);
}
