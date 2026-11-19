import type { PaymentMethodBE, PaymentStatus } from "./payment.type";

// Khớp enum OrderStatus trong prisma/schema.prisma
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PRINTING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type CreateOrderItem = {
  variantId: string; // UUID
  quantity: number;
  /** Tỉ lệ in (%) — server dùng để tính giá, mặc định 100 */
  scale?: number;
};

export type ShippingAddressPayload = {
  recipient: string;
  phone: string;
  email: string;
  addressText: string;
};

/** Payload FE gửi khi tạo đơn hàng */
export type CreateOrderPayload = {
  shippingAddress: ShippingAddressPayload;
  items: CreateOrderItem[];
};

// ===== Response từ GET /order, GET /order/:id =====
// Prisma Decimal được serialize thành string

export type OrderItemResponse = {
  id: string;
  quantity: number;
  price: string | number;
  variant: {
    id: string;
    name: string;
    material: { id: string; name: string; color: string | null } | null;
    product: {
      id: string;
      name: string;
      basePrice: string | number;
      images?: { url: string }[];
    };
  };
};

export type OrderPaymentResponse = {
  id: string;
  method: PaymentMethodBE | "CREDIT_CARD" | "PAYPAL";
  status: PaymentStatus;
  amount: string | number;
  transactionId: string | null;
};

export type OrderShipmentResponse = {
  id: string;
  carrier: string | null;
  trackingNo: string | null;
  status: "PREPARING" | "IN_TRANSIT" | "DELIVERED" | "RETURNED";
  shippedAt: string | null;
  deliveredAt: string | null;
};

export type OrderAddressResponse = {
  id: string;
  recipient: string;
  phone: string;
  address1: string;
  address2: string | null;
  city: string;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: string | number;
  createdAt: string;
  updatedAt: string;
  items: OrderItemResponse[];
  payment: OrderPaymentResponse | null;
  shipment: OrderShipmentResponse | null;
  address: OrderAddressResponse | null;
};
