"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OrderTimeline } from "@/components/dashboard/order-timeline";
import { ArrowLeft, Download, MessageSquare } from "lucide-react";

// Mock order data
const orderData = {
  id: "ORD-2024-001",
  status: "printing" as const,
  updatedAt: new Date(),
  createdAt: new Date("2024-12-01"),
  items: [
    {
      name: "Tượng Rồng Phong Thủy",
      image: "/dragon-statue-gold-3d-printed.jpg",
      quantity: 1,
      price: 350000,
      specs: {
        material: "Resin Standard",
        color: "Vàng",
        size: "Vừa (15cm)",
        infill: "100%",
        layer: "0.05mm",
      },
    },
    {
      name: "Núm vặn tủ bếp Hexagon",
      image: "/hexagon-cabinet-knob-black.jpg",
      quantity: 4,
      price: 25000,
      specs: {
        material: "PETG",
        color: "Đen",
        size: "30mm",
        infill: "50%",
        layer: "0.2mm",
      },
    },
  ],
  shipping: {
    name: "Nguyễn Văn A",
    phone: "0912 345 678",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
  },
  technicalNotes: "Vui lòng chà nhám kỹ mặt tiền của tượng rồng",
  subtotal: 450000,
  shippingFee: 35000,
  total: 485000,
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = use(params);
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value) + "đ";

  return (
    <div className="flex flex-col gap-6">
      {/* Back Link */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại Dashboard
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Đơn hàng #{orderData.id}</h1>
          <p className="text-muted-foreground">
            Đặt ngày {orderData.createdAt.toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-2 border-foreground gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            Tải hóa đơn
          </Button>
          <Button
            variant="outline"
            className="border-2 border-foreground gap-2 bg-transparent"
          >
            <MessageSquare className="h-4 w-4" />
            Liên hệ hỗ trợ
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        {/* Left: Order Details */}
        <div className="space-y-6">
          {/* Items */}
          <div className="border-2 border-foreground">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">
                Sản phẩm ({orderData.items.length})
              </h2>
            </div>
            <div className="divide-y-2 divide-foreground">
              {orderData.items.map((item, index) => (
                <div key={index} className="p-4 flex gap-4">
                  <div className="w-24 h-24 border-2 border-foreground bg-secondary relative overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="font-bold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Số lượng: {item.quantity} × {formatPrice(item.price)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(item.specs).map(([key, value]) => (
                        <span
                          key={key}
                          className="text-xs px-2 py-1 bg-secondary border border-foreground"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-2 border-foreground">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">Thông tin giao hàng</h2>
            </div>
            <div className="p-4">
              <p className="font-medium">{orderData.shipping.name}</p>
              <p className="text-muted-foreground">
                {orderData.shipping.phone}
              </p>
              <p className="text-muted-foreground">
                {orderData.shipping.address}
              </p>
            </div>
          </div>

          {/* Technical Notes */}
          {orderData.technicalNotes && (
            <div className="border-2 border-foreground">
              <div className="p-4 border-b-2 border-foreground bg-secondary">
                <h2 className="font-bold text-lg">Ghi chú kỹ thuật</h2>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground italic">
                  &quot;{orderData.technicalNotes}&quot;
                </p>
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="border-2 border-foreground">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">Thanh toán</h2>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{formatPrice(orderData.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span>{formatPrice(orderData.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-foreground">
                <span>Tổng cộng</span>
                <span className="text-primary">
                  {formatPrice(orderData.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Timeline */}
        <div className="lg:self-start">
          <div className="border-2 border-foreground bg-card sticky top-32">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">Tiến độ đơn hàng</h2>
            </div>
            <div className="p-4">
              <OrderTimeline
                currentStatus={orderData.status}
                updatedAt={orderData.updatedAt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
