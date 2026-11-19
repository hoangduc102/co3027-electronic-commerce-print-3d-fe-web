import type { Order, OrderItemResponse } from "@/types/order";

/** Prisma Decimal được serialize thành string */
export const toNumber = (value: string | number | null | undefined) =>
  Number(value ?? 0);

export const orderItemImage = (item: OrderItemResponse) =>
  item.variant.product.images?.[0]?.url || "/placeholder.svg";

export const orderSubtotal = (order: Order) =>
  order.items.reduce(
    (sum, item) => sum + toNumber(item.price) * item.quantity,
    0
  );

/** Mã đơn ngắn gọn để hiển thị (8 ký tự đầu của UUID) */
export const shortOrderId = (id: string) => id.slice(0, 8).toUpperCase();
