import { Product, ProductSchema } from "@/schemas/product.schema";
import { httpClient } from "./httpClient";

type ApiResponse<T> = { data: T };

const parseList = (items: unknown[]) =>
  items.map((item) => ProductSchema.parse(item));

export type CreateProductPayload = {
  name: string;
  description?: string;
  basePrice: number;
  isActive?: boolean;
  printFileId?: string;
};

export type CreateVariantPayload = {
  productId: string;
  materialId: string;
  name: string;
  /** mm³ */
  volume?: number;
  stock: number;
};

export const productService = {
  /** Sản phẩm đang bán trong cửa hàng (GET /products?isActive=true) */
  async getAll(): Promise<Product[]> {
    const res = await httpClient.get<ApiResponse<unknown[]>>(
      "/products?isActive=true"
    );
    return parseList(res.data);
  },

  /**
   * Sản phẩm của 1 người dùng — gồm các mẫu "in theo yêu cầu"
   * tạo từ trang báo giá (isActive = false, có printFile).
   */
  async getByUser(userId: string): Promise<Product[]> {
    const res = await httpClient.get<ApiResponse<unknown[]>>(
      `/products?userId=${encodeURIComponent(userId)}`
    );
    return parseList(res.data);
  },

  async getById(id: string): Promise<Product> {
    const res = await httpClient.get<ApiResponse<unknown>>(
      `/products/${encodeURIComponent(id)}`
    );
    return ProductSchema.parse(res.data);
  },

  async create(payload: CreateProductPayload): Promise<Product> {
    const res = await httpClient.post<ApiResponse<unknown>>(
      "/products",
      payload
    );
    return ProductSchema.parse(res.data);
  },

  async createVariant(payload: CreateVariantPayload): Promise<{ id: string }> {
    const res = await httpClient.post<ApiResponse<{ id: string }>>(
      "/variants",
      payload
    );
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/products/${encodeURIComponent(id)}`);
  },
};
