import type { CreateOrderPayload } from "@/types/order";
import { httpClient } from "./httpClient";

export type OrderResponse = {
  data: {
    id: string;
    status: string;
    totalAmount: number;
  };
};

export async function createOrder(payload: CreateOrderPayload) {
  return httpClient.post<OrderResponse>("/order", payload);
}
