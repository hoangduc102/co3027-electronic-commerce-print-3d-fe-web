// ===== Payment enums (match Prisma) =====

export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "CANCELLED";

export type PaymentMethodBE = "BANK_TRANSFER" | "CASH_ON_DELIVERY";

// ===== UI only (frontend choice) =====

export type PaymentMethodUI = "cod" | "vnpay";

// ===== Map UI → BE =====
// VNPay được map vào BANK_TRANSFER
export function mapPaymentMethodToBE(method: PaymentMethodUI): PaymentMethodBE {
  return method === "cod" ? "CASH_ON_DELIVERY" : "BANK_TRANSFER";
}
