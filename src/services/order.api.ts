import type { CreateOrderPayload, Order, OrderStatus } from "@/types/order";
import { httpClient } from "./httpClient";

type ApiResponse<T> = { data: T };

export async function createOrder(payload: CreateOrderPayload) {
  const res = await httpClient.post<ApiResponse<Order>>("/order", payload);
  return res.data;
}

/** Đơn hàng của người dùng hiện tại (backend tự lọc theo user) */
export async function getMyOrders(status?: OrderStatus) {
  const query = status ? `?status=${status}` : "";
  const res = await httpClient.get<ApiResponse<Order[]>>(`/order${query}`);
  return res.data;
}

export async function getOrder(id: string) {
  const res = await httpClient.get<ApiResponse<Order>>(
    `/order/${encodeURIComponent(id)}`
  );
  return res.data;
}

/** Khách hàng chỉ được huỷ đơn đang PENDING */
export async function cancelOrder(id: string) {
  const res = await httpClient.patch<ApiResponse<Order>>(
    `/order/${encodeURIComponent(id)}`,
    { status: "CANCELLED" }
  );
  return res.data;
}
