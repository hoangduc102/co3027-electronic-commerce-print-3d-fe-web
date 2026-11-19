import type { PaymentMethodBE } from "@/types/payment.type";
import { httpClient } from "./httpClient";

export type PaymentResponse = {
  data: {
    id: string;
    status: string;
  };
};

export function createPayment(payload: {
  orderId: string;
  method: PaymentMethodBE;
}) {
  return httpClient.post<PaymentResponse>("/payment", payload);
}

export function getVnPayUrl(paymentId: string) {
  return httpClient.post<{ data: { url: string } }>(
    `/payment/${encodeURIComponent(paymentId)}/vnpay-url`
  );
}

export type VnPayReturnResult = {
  paymentId: string;
  orderId: string | null;
  responseCode: string;
  success: boolean;
};

/**
 * Chuyển nguyên query string VNPay trả về cho backend để xác thực chữ ký
 * và cập nhật trạng thái thanh toán.
 */
export async function verifyVnPayReturn(queryString: string) {
  const res = await httpClient.get<{ data: VnPayReturnResult }>(
    `/payment/vnpay-return?${queryString}`
  );
  return res.data;
}
