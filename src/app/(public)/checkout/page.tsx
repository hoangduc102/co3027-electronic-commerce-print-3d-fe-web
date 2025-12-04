"use client";

import { useState } from "react";
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
import { CreditCard, Truck, AlertTriangle } from "lucide-react";

// Mock cart data
const initialCart = [
  {
    id: "1",
    name: "Tượng Rồng Phong Thủy",
    image: "/dragon-statue-gold-3d-printed.jpg",
    price: 350000,
    quantity: 1,
    specs: { material: "Resin", color: "#FFD700", size: "Vừa (15cm)" },
  },
  {
    id: "2",
    name: "Núm vặn tủ bếp Hexagon",
    image: "/hexagon-cabinet-knob-black-3d-printed.jpg",
    price: 25000,
    quantity: 4,
    specs: { material: "PETG", color: "#000000", size: "30mm" },
  },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState(initialCart);
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agreements, setAgreements] = useState({
    copyright: false,
    expectations: false,
  });

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 35000;
  const total = subtotal + shippingFee;

  const canCheckout =
    agreements.copyright && agreements.expectations && cart.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Thanh toán</h1>

          {/* Trust Badges */}
          <div className="mb-8">
            <TrustBadges variant="horizontal" />
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Left: Cart & Forms */}
            <div className="space-y-8">
              {/* Cart Items */}
              <div>
                <h2 className="font-bold text-xl uppercase tracking-wide mb-4">
                  Giỏ hàng ({cart.length})
                </h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                  {cart.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-foreground">
                      <p className="text-muted-foreground">Giỏ hàng trống</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="border-2 border-foreground p-6">
                <h2 className="font-bold text-xl uppercase tracking-wide mb-4">
                  Thông tin giao hàng
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-2 block">
                      Họ và tên
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nguyễn Văn A"
                      className="border-2 border-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block">
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      placeholder="0912 345 678"
                      className="border-2 border-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email" className="mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="border-2 border-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address" className="mb-2 block">
                      Địa chỉ giao hàng
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      className="border-2 border-foreground min-h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Notes */}
              <div className="border-2 border-foreground p-6">
                <h2 className="font-bold text-xl uppercase tracking-wide mb-4">
                  Ghi chú kỹ thuật
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Ghi chú cho kỹ thuật viên về yêu cầu đặc biệt (tùy chọn)
                </p>
                <Textarea
                  value={technicalNotes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setTechnicalNotes(e.target.value)
                  }
                  placeholder="Ví dụ: Vui lòng chà nhám kỹ mặt tiền, giữ nguyên support để vận chuyển an toàn..."
                  className="border-2 border-foreground min-h-[100px]"
                />
              </div>

              {/* Payment Method */}
              <div className="border-2 border-foreground p-6">
                <h2 className="font-bold text-xl uppercase tracking-wide mb-4">
                  Phương thức thanh toán
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
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
                  <div className="flex items-center gap-3 p-4 border-2 border-foreground cursor-pointer hover:bg-secondary">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label
                      htmlFor="bank"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-muted-foreground">
                          Chuyển khoản trước khi sản xuất
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Legal Agreements */}
              <div className="border-2 border-foreground p-6 bg-amber-50">
                <div className="flex items-start gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <h2 className="font-bold text-lg">Điều khoản quan trọng</h2>
                </div>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={agreements.copyright}
                      onCheckedChange={(checked: boolean) =>
                        setAgreements((prev) => ({
                          ...prev,
                          copyright: checked,
                        }))
                      }
                      className="mt-1 border-foreground data-[state=checked]:bg-primary"
                    />
                    <span className="text-sm leading-relaxed">
                      <strong>Bản quyền:</strong> Tôi xác nhận rằng tôi có quyền
                      sở hữu trí tuệ hoặc quyền sử dụng hợp pháp đối với các
                      file 3D đã tải lên. Tôi chịu trách nhiệm hoàn toàn nếu vi
                      phạm bản quyền.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={agreements.expectations}
                      onCheckedChange={(checked: boolean) =>
                        setAgreements((prev) => ({
                          ...prev,
                          expectations: checked,
                        }))
                      }
                      className="mt-1 border-foreground data-[state=checked]:bg-primary"
                    />
                    <span className="text-sm leading-relaxed">
                      <strong>Kỳ vọng:</strong> Tôi hiểu rằng in 3D FDM sẽ có
                      các đường vân (layer lines) và không mịn hoàn toàn như đúc
                      nhựa. Chất lượng bề mặt phụ thuộc vào công nghệ và vật
                      liệu được chọn.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:self-start">
              <div className="border-2 border-foreground bg-card sticky top-32">
                <div className="p-4 border-b-2 border-foreground bg-secondary">
                  <h3 className="font-bold text-lg">Tóm tắt đơn hàng</h3>
                </div>

                <div className="p-4 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate flex-1 mr-2">
                        {item.name}{" "}
                        <span className="text-muted-foreground">
                          ×{item.quantity}
                        </span>
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t-2 border-foreground pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Phí vận chuyển
                      </span>
                      <span>{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-foreground">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold text-base"
                    disabled={!canCheckout}
                  >
                    Đặt hàng
                  </Button>

                  {!canCheckout && (
                    <p className="text-xs text-center text-muted-foreground">
                      Vui lòng đồng ý với các điều khoản để tiếp tục
                    </p>
                  )}

                  {/* Payment Methods */}
                  <div className="pt-4 border-t border-foreground/20">
                    <PaymentMethods variant="text" />
                  </div>

                  {/* Warranty Badges */}
                  <div className="pt-4">
                    <WarrantyBadges />
                  </div>

                  {/* Trust Badges Compact */}
                  <TrustBadges variant="compact" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
