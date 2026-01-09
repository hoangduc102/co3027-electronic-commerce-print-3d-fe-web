// Khớp OrderStatus từ @prisma/client
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type CreateOrderItem = {
  variantId: string; // UUID
  quantity: number;
  price: number;
};

export type ShippingAddressPayload = {
  recipient: string;
  phone: string;
  email: string;
  addressText: string;
};

/**
 * Payload FE gửi khi tạo đơn hàng
 */
export type CreateOrderPayload = {
  /**
   * Dùng khi user chọn address đã lưu
   */
  addressId?: string;

  /**
   * Dùng khi checkout nhập tay
   */
  shippingAddress?: ShippingAddressPayload;

  items: CreateOrderItem[];
};
