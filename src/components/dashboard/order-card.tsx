"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { orderItemImage, shortOrderId, toNumber } from "@/lib/order-utils";
import type { Order, OrderStatus } from "@/types/order";

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-300",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
  PRINTING: "bg-violet-100 text-violet-800 border-violet-300",
  SHIPPED: "bg-emerald-100 text-emerald-800 border-emerald-300",
  DELIVERED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
};

export function OrderCard({ order }: { order: Order }) {
  const { id, status, items } = order;

  return (
    <div className="border-2 border-foreground bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-foreground bg-secondary">
        <div>
          <p className="font-mono text-sm text-muted-foreground">Đơn hàng</p>
          <p className="font-bold">#{shortOrderId(id)}</p>
        </div>
        <Badge className={`border ${ORDER_STATUS_COLORS[status]}`}>
          {ORDER_STATUSES[status].label}
        </Badge>
      </div>

      {/* Items Preview */}
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="w-16 h-16 border-2 border-foreground bg-secondary relative overflow-hidden"
              title={item.variant.product.name}
            >
              <Image
                src={orderItemImage(item)}
                alt={item.variant.product.name}
                fill
                className="object-cover"
              />
              {item.quantity > 1 && (
                <span className="absolute bottom-0 right-0 bg-foreground text-background text-xs px-1">
                  ×{item.quantity}
                </span>
              )}
            </div>
          ))}
          {items.length > 3 && (
            <div className="w-16 h-16 border-2 border-foreground bg-secondary flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                +{items.length - 3}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Ngày đặt</p>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tổng tiền</p>
            <p className="font-bold text-primary">
              {formatPrice(toNumber(order.totalAmount))}
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full border-2 border-foreground bg-transparent"
        >
          <Link href={`/dashboard/orders/${id}`}>
            Chi tiết
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
