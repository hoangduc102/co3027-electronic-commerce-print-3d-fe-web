import { z } from "zod";

// --- Sub-Schemas for Relations ---
export const ProductImageSchema = z.object({
  id: z.string().uuid(),
  url: z.url(),
  type: z.string(),
  altText: z.string().nullable().optional(),
});

export const ProductTagSchema = z.object({
  tag: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});

export const ProductVariantSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  stock: z.number().int(),
  material: z
    .object({
      name: z.string(),
      color: z.string(),
    })
    .optional(),
});

// --- Main Product Schema ---
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  basePrice: z.coerce.number(),
  isActive: z.boolean(),
  images: z
    .array(
      z.object({
        url: z.string(),
        altText: z.string().nullable().optional(),
      })
    )
    .optional()
    .default([]),
  tags: z.array(z.any()).optional().default([]),
  variants: z.array(z.any()).optional().default([]),

  image: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductResponseSchema = z.object({
  data: z.array(ProductSchema),
  meta: z
    .object({
      total: z.number(),
      page: z.number(),
      lastPage: z.number(),
    })
    .optional(),
});
