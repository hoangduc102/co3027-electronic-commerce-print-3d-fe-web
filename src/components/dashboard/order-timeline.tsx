"use client";

import type { LucideIcon } from "lucide-react";
import {
  Check,
  ClipboardCheck,
  Package,
  Printer,
  Truck,
  XCircle,
} from "lucide-react";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderStatus } from "@/types/order";

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  updatedAt: Date;
}

/** Các bước của 1 đơn bình thường (CANCELLED hiển thị riêng) */
const steps: { status: Exclude<OrderStatus, "CANCELLED">; icon: LucideIcon }[] =
  [
    { status: "PENDING", icon: Package },
    { status: "CONFIRMED", icon: ClipboardCheck },
    { status: "PRINTING", icon: Printer },
    { status: "SHIPPED", icon: Truck },
    { status: "DELIVERED", icon: Check },
  ];

export function OrderTimeline({
  currentStatus,
  updatedAt,
}: OrderTimelineProps) {
  if (currentStatus === "CANCELLED") {
    return (
      <div className="flex gap-3 items-start p-3 border-2 border-red-300 bg-red-50">
        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
        <div>
          <p className="font-bold text-red-700">
            {ORDER_STATUSES.CANCELLED.label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Cập nhật: {updatedAt.toLocaleString("vi-VN")}
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.status === currentStatus);

  return (
    <div className="relative">
      {steps.map(({ status, icon: Icon }, index) => {
        const statusInfo = ORDER_STATUSES[status];
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <div key={status} className="flex gap-4 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center border-2 ${
                  isCompleted || isCurrent
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-secondary border-foreground text-muted-foreground"
                } ${isCurrent && status !== "DELIVERED" ? "animate-pulse" : ""}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-0.5 flex-1 mt-2 ${isCompleted ? "bg-primary" : "bg-foreground/20"}`}
                />
              )}
            </div>

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
