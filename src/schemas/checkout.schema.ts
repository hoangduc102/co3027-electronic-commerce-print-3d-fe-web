import { z } from "zod";

export const checkoutSchema = z.object({
  recipient: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  addressText: z.string().min(5, "Vui lòng nhập địa chỉ"),
  paymentMethod: z.enum(["cod", "vnpay"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
