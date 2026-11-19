"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/dashboard/order-card";
import { AlertCircle, ArrowLeft, Filter, Loader2 } from "lucide-react";
import { useMyOrders } from "@/hooks/use-orders";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderStatus } from "@/types/order";

const statusFilters: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  ...(Object.keys(ORDER_STATUSES) as OrderStatus[]).map((status) => ({
    value: status,
    label: ORDER_STATUSES[status].label,
  })),
];

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const { data: orders = [], isLoading, isError, error } = useMyOrders();

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại Dashboard
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Tất cả đơn hàng</h1>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-3 py-1.5 text-sm border-2 transition-colors ${
                  statusFilter === filter.value
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-foreground hover:bg-secondary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center py-16 text-destructive">
          <AlertCircle className="h-10 w-10 mb-2" />
          <p>{(error as Error).message}</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-foreground">
          <p className="text-lg font-medium mb-2">Không có đơn hàng nào</p>
          <p className="text-muted-foreground mb-4">
            {orders.length > 0
              ? "Thử thay đổi bộ lọc trạng thái"
              : "Bạn chưa đặt đơn hàng nào"}
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground"
          >
            <Link href="/quote">Tạo đơn hàng mới</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
