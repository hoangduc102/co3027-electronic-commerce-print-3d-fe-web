import { httpClient } from "./httpClient";

export type PaymentResponse = {
  data: {
    id: string;
    status: string;
  };
};

export function createPayment(payload: {
  orderId: string;
  method: "BANK_TRANSFER" | "CASH_ON_DELIVERY";
}) {
  return httpClient.post<PaymentResponse>("/payment", payload);
}

export function getVnPayUrl(paymentId: string) {
  return httpClient.post<{ data: { url: string } }>(
    `/payment/${paymentId}/vnpay-url`
  );
}
