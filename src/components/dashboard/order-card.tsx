"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw } from "lucide-react";
import { ORDER_STATUSES } from "@/lib/constants";

interface OrderCardProps {
  id: string;
  date: Date;
  status: keyof typeof ORDER_STATUSES;
  items: { name: string; image: string; quantity: number }[];
  total: number;
}

export function OrderCard({ id, date, status, items, total }: OrderCardProps) {
  const statusInfo = ORDER_STATUSES[status];
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value) + "đ";

  const statusColors: Record<string, string> = {
    received: "bg-blue-100 text-blue-800 border-blue-300",
    reviewing: "bg-amber-100 text-amber-800 border-amber-300",
    printing: "bg-violet-100 text-violet-800 border-violet-300",
    "post-processing": "bg-pink-100 text-pink-800 border-pink-300",
    shipping: "bg-emerald-100 text-emerald-800 border-emerald-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <div className="border-2 border-foreground bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-foreground bg-secondary">
        <div>
          <p className="font-mono text-sm text-muted-foreground">Đơn hàng</p>
          <p className="font-bold">#{id}</p>
        </div>
        <Badge className={`border ${statusColors[status]}`}>
          {statusInfo.label}
        </Badge>
      </div>

      {/* Items Preview */}
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          {items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="w-16 h-16 border-2 border-foreground bg-secondary relative overflow-hidden"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
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
            <p className="font-medium">{date.toLocaleDateString("vi-VN")}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tổng tiền</p>
            <p className="font-bold text-primary">{formatPrice(total)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-2 border-foreground bg-transparent"
          >
            <Link href={`/dashboard/orders/${id}`}>
              Chi tiết
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          {status === "delivered" && (
            <Button
              variant="outline"
              className="border-2 border-foreground gap-1 bg-transparent"
            >
              <RotateCcw className="h-4 w-4" />
              Đặt lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
