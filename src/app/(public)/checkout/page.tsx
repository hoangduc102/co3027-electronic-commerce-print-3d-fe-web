"use client";

import { useState } from "react";
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
import {
  CreditCard,
  Truck,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";

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

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    formState: { errors },
  } = form;

  /* ================= SUBMIT ================= */
  const onSubmit = async (values: CheckoutFormValues) => {
    if (!user || cart.length === 0) return;

    try {
      setIsSubmitting(true);

      const order = await createOrder({
        shippingAddress: {
          recipient: values.recipient,
          phone: values.phone,
          email: values.email,
          addressText: values.addressText,
        },
        items: cart.map((item) => ({
          variantId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      // 2️⃣ Create Payment
      const payment = await createPayment({
        orderId: order.data.id,
        method: mapPaymentMethodToBE(values.paymentMethod),
      });

      // 3️⃣ VNPay → redirect
      if (values.paymentMethod === "vnpay") {
        const { data } = await getVnPayUrl(payment.data.id);
        window.location.href = data.url;
        console.log(data);
        return;
      }

      // 4️⃣ COD → done
      clearCart();
      setOrderNumber(order.data.id);
      // setShowSuccessDialog(true);
    } catch (err) {
      console.error(err);
      alert("Không thể đặt hàng, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= CALC ================= */
  const subtotal = getCartTotal();
  const shippingFee = cart.length > 0 ? 35000 : 0;
  const total = subtotal + shippingFee;

  const canCheckout =
    agreements.copyright &&
    agreements.expectations &&
    cart.length > 0 &&
    !isSubmitting;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value) + "đ";

  /* ================= UI ================= */
  const onInvalid = (errs: any) => {
    console.log("INVALID FORM:", errs);
  };
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
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            onSubmitCapture={() => console.log("FORM SUBMIT CAPTURE")}
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
                <Input {...register("email")} placeholder="Email" />

                <Textarea
                  {...register("addressText")}
                  placeholder="Địa chỉ giao hàng"
                />
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
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>

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
