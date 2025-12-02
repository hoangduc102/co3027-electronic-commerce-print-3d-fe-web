import { httpClient } from "@/services/httpClient";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  material?: string;
  rating?: number;
  reviewsCount?: number;
  images: string[];
  variants?: Array<{
    id?: string;
    material: string;
    additionalPrice: number;
    inStock: boolean;
  }>;
  createdAt?: string;
  updatedAt?: string;
};

export type Review = {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
};

type GetReviewsResponse =
  | Review[]
  | { reviews: Review[]; total?: number };

export const productService = {
  getById: async (id: string): Promise<Product> => {
    const data = await httpClient.get<Product>(`/products/${id}`);
    return data;
  },

  getReviews: async (productId: string): Promise<Review[]> => {
    const data = await httpClient.get<GetReviewsResponse>(`/reviews?productId=${productId}`);

    if (Array.isArray(data)) {
      return data;
    }
    return data.reviews || [];
  },
};