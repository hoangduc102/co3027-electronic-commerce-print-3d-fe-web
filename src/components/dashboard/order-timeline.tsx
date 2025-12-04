"use client";

import type React from "react";

import { Check, Clock, Printer, Sparkles, Truck, Package } from "lucide-react";
import { ORDER_STATUSES } from "@/lib/constants";

type OrderStatusKey = keyof typeof ORDER_STATUSES;

interface OrderTimelineProps {
  currentStatus: OrderStatusKey;
  updatedAt: Date;
}

const statusIcons: Record<OrderStatusKey, React.ElementType> = {
  received: Package,
  reviewing: Clock,
  printing: Printer,
  "post-processing": Sparkles,
  shipping: Truck,
  delivered: Check,
};

const statusOrder: OrderStatusKey[] = [
  "received",
  "reviewing",
  "printing",
  "post-processing",
  "shipping",
  "delivered",
];

export function OrderTimeline({
  currentStatus,
  updatedAt,
}: OrderTimelineProps) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="relative">
      {statusOrder.map((status, index) => {
        const Icon = statusIcons[status] as React.ElementType;
        const statusInfo = ORDER_STATUSES[status];
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <div key={status} className="flex gap-4 pb-8 last:pb-0">
            {/* Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center border-2 ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                      ? "bg-primary border-primary text-primary-foreground animate-pulse"
                      : "bg-secondary border-foreground text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              {index < statusOrder.length - 1 && (
                <div
                  className={`w-0.5 flex-1 mt-2 ${isCompleted ? "bg-primary" : "bg-foreground/20"}`}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h4
                  className={`font-bold ${isPending ? "text-muted-foreground" : ""}`}
                >
                  {statusInfo.label}
                </h4>
                {isCurrent && (
                  <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground">
                    Hiện tại
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {statusInfo.description}
              </p>
              {isCurrent && (
                <p className="text-xs text-muted-foreground mt-1">
                  Cập nhật: {updatedAt.toLocaleString("vi-VN")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
