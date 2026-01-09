import { Product, ProductSchema } from "@/schemas/product.schema";
import { httpClient } from "./httpClient";

export const productService = {
  /**
   * Fetch all products
   * GET /api/v1/products
   */
  async getAll(): Promise<Product[]> {
    const response = await httpClient.get<{ data: Product[] }>("/products");
    // Validate and parse the array of products
    return response.data.map((item) => ProductSchema.parse(item));
  },

  /**
   * Fetch one product
   * GET /api/v1/products/:id
   */
  async getById(id: string): Promise<Product> {
    const response = await httpClient.get<{ data: Product }>(`/products/${id}`);
    return ProductSchema.parse(response.data);
  },

  /**
   * Create product
   * POST /api/v1/products
   */
  async create(payload: Partial<Product>): Promise<Product> {
    const response = await httpClient.post<{ data: Product }>(
      "/products",
      payload
    );
    return ProductSchema.parse(response.data);
  },
};
