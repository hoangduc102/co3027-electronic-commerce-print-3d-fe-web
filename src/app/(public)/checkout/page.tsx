"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CartItem } from "@/components/checkout/cart-item";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TrustBadges } from "@/components/ui/trust-badges";
import { PaymentMethods } from "@/components/ui/payment-methods";
import { WarrantyBadges } from "@/components/store/warranty-info";
import { CreditCard, Truck, AlertTriangle, Loader2 } from "lucide-react";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/services/order.api";
import { createPayment, getVnPayUrl } from "@/services/payment.api";
import { mapPaymentMethodToBE } from "@/types/payment.type";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { checkoutSchema, CheckoutFormValues } from "@/schemas/checkout.schema";
import { formatPrice } from "@/lib/utils";
import { SHIPPING_FEE } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** Đơn đã tạo nhưng bước thanh toán lỗi → cho người dùng vào trang đơn để thử lại */
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [agreements, setAgreements] = useState({
    copyright: false,
    expectations: false,
  });

  /* ================= FORM ================= */
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      recipient: "",
      phone: "",
      email: "",
      addressText: "",
      paymentMethod: "cod",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  // Điền sẵn email của tài khoản nếu người dùng chưa nhập
  useEffect(() => {
    if (user?.email && !getValues("email")) {
      setValue("email", user.email);
    }
  }, [user, getValues, setValue]);

  /* ================= SUBMIT ================= */
  const onSubmit = async (values: CheckoutFormValues) => {
    if (!user || cart.length === 0) return;

    let createdOrderId: string | null = null;
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setPendingOrderId(null);

      const order = await createOrder({
        shippingAddress: {
          recipient: values.recipient,
          phone: values.phone,
          email: values.email,
          addressText: values.addressText,
        },
        items: cart.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
          scale: item.scale ?? 100,
        })),
      });
      // Đơn đã nằm trên server → xoá giỏ để tránh đặt trùng khi thử lại
      createdOrderId = order.id;
      clearCart();

      // 2️⃣ Create Payment
      const payment = await createPayment({
        orderId: order.id,
        method: mapPaymentMethodToBE(values.paymentMethod),
      });

      // 3️⃣ VNPay → redirect
      if (values.paymentMethod === "vnpay") {
        const { data } = await getVnPayUrl(payment.data.id);
        window.location.href = data.url;
        return;
      }

      // 4️⃣ COD → done
      setOrderNumber(order.id);
      setShowSuccessDialog(true);
    } catch (err) {
      console.error(err);
      const reason = err instanceof Error && err.message ? err.message : "";
      if (createdOrderId) {
        setPendingOrderId(createdOrderId);
        setSubmitError(
          `Đơn hàng đã được tạo nhưng chưa khởi tạo được thanh toán${reason ? ` (${reason})` : ""}.`
        );
      } else {
        setSubmitError(
          reason
            ? `Không thể đặt hàng: ${reason}`
            : "Không thể đặt hàng, vui lòng thử lại"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= CALC ================= */
  const subtotal = getCartTotal();
  const shippingFee = cart.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shippingFee;

  const canCheckout =
    agreements.copyright &&
    agreements.expectations &&
    cart.length > 0 &&
    !isSubmitting;

  /* ================= UI ================= */
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="mb-4">Bạn cần đăng nhập để đặt hàng</p>
        <Button onClick={() => router.push("/login")}>Đăng nhập</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Thanh toán</h1>

          <TrustBadges variant="horizontal" className="mb-8" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid lg:grid-cols-[1fr_400px] gap-8"
          >
            {/* ================= LEFT ================= */}
            <div className="space-y-8">
              {/* Cart */}
              <div>
                <h2 className="font-bold text-xl mb-4">
                  Giỏ hàng ({cart.length})
                </h2>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </div>

              {/* Shipping */}
              <div className="border-2 border-foreground p-6 space-y-4">
                <h2 className="font-bold text-xl">Thông tin giao hàng</h2>

                <Input {...register("recipient")} placeholder="Họ và tên" />
                {errors.recipient && (
                  <p className="text-red-500 text-sm">
                    {errors.recipient.message}
                  </p>
                )}

                <Input {...register("phone")} placeholder="Số điện thoại" />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}

                <Input {...register("email")} placeholder="Email" />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <Textarea
                  {...register("addressText")}
                  placeholder="Địa chỉ giao hàng"
                />
                {errors.addressText && (
                  <p className="text-red-500 text-sm">
                    {errors.addressText.message}
                  </p>
                )}
              </div>

              {/* Payment */}
              <div className="border-2 border-foreground p-6">
                <h2 className="font-bold text-xl uppercase tracking-wide mb-4">
                  Phương thức thanh toán
                </h2>

                <RadioGroup
                  value={watch("paymentMethod")}
                  onValueChange={(value) =>
                    form.setValue("paymentMethod", value as "cod" | "vnpay")
                  }
                  className="space-y-3"
                >
                  {/* COD */}
                  <div className="flex items-center gap-3 p-4 border-2 border-foreground cursor-pointer hover:bg-secondary">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <Truck className="h-5 w-5" />
                      <div>
                        <p className="font-medium">
                          Thanh toán khi nhận hàng (COD)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Trả tiền mặt khi nhận hàng
                        </p>
                      </div>
                    </Label>
                  </div>

                  {/* VNPay */}
                  <div className="flex items-center gap-3 p-4 border-2 border-foreground cursor-pointer hover:bg-secondary">
                    <RadioGroupItem value="vnpay" id="vnpay" />
                    <Label
                      htmlFor="vnpay"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Thanh toán qua VNPay</p>
                        <p className="text-sm text-muted-foreground">
                          QR / ATM / Internet Banking
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Agreements */}
              <div className="border-2 border-foreground p-6 bg-amber-50 space-y-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <h2 className="font-bold text-lg">Điều khoản quan trọng</h2>
                </div>

                {/* Copyright */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={agreements.copyright}
                    onCheckedChange={(v) =>
                      setAgreements((p) => ({ ...p, copyright: !!v }))
                    }
                    className="mt-1 border-foreground data-[state=checked]:bg-primary"
                  />
                  <span className="text-sm leading-relaxed">
                    <strong>Bản quyền:</strong> Tôi xác nhận rằng tôi có quyền
                    sở hữu trí tuệ hoặc quyền sử dụng hợp pháp đối với các file
                    3D đã tải lên. Tôi chịu trách nhiệm hoàn toàn nếu vi phạm
                    bản quyền.
                  </span>
                </label>

                {/* Expectations */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={agreements.expectations}
                    onCheckedChange={(v) =>
                      setAgreements((p) => ({ ...p, expectations: !!v }))
                    }
                    className="mt-1 border-foreground data-[state=checked]:bg-primary"
                  />
                  <span className="text-sm leading-relaxed">
                    <strong>Kỳ vọng:</strong> Tôi hiểu rằng in 3D FDM sẽ có các
                    đường vân (layer lines) và không mịn hoàn toàn như đúc nhựa.
                    Chất lượng bề mặt phụ thuộc vào công nghệ và vật liệu được
                    chọn.
                  </span>
                </label>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="sticky top-32 border-2 border-foreground p-4 flex flex-col  gap-2   ">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t-2 border-foreground pt-2">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>

              {submitError && (
                <div className="text-sm text-red-600" role="alert">
                  <p>{submitError}</p>
                  {pendingOrderId && (
                    <Link
                      href={`/dashboard/orders/${pendingOrderId}`}
                      className="underline font-medium"
                    >
                      Xem đơn hàng và thanh toán lại
                    </Link>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full mt-4"
                disabled={!canCheckout}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Đặt hàng"
                )}
              </Button>

              <PaymentMethods />
              <WarrantyBadges />
              <TrustBadges variant="compact" />
            </div>
          </form>
        </div>
      </main>

      {/* SUCCESS DIALOG */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đặt hàng thành công</DialogTitle>
            <DialogDescription>
              Mã đơn hàng: <strong>{orderNumber}</strong>
            </DialogDescription>
          </DialogHeader>

          <Button onClick={() => router.push("/dashboard/orders")}>
            Xem đơn hàng
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
