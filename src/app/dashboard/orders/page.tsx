"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/dashboard/order-card";
import { ArrowLeft, Filter } from "lucide-react";
import { useState } from "react";

// Mock data
const allOrders = [
  {
    id: "ORD-2024-001",
    date: new Date("2024-12-01"),
    status: "printing" as const,
    items: [
      {
        name: "Tượng Rồng Phong Thủy",
        image: "/dragon-statue-gold-3d-printed.jpg",
        quantity: 1,
      },
      {
        name: "Núm vặn Hexagon",
        image: "/hexagon-cabinet-knob-black-3d-printed.jpg",
        quantity: 4,
      },
    ],
    total: 450000,
  },
  {
    id: "ORD-2024-002",
    date: new Date("2024-11-28"),
    status: "delivered" as const,
    items: [
      {
        name: "Figure Chibi Anime",
        image: "/chibi-anime-figure-3d-printed-colorful.jpg",
        quantity: 2,
      },
    ],
    total: 360000,
  },
  {
    id: "ORD-2024-003",
    date: new Date("2024-11-20"),
    status: "delivered" as const,
    items: [
      {
        name: "Giá đỡ điện thoại",
        image: "/phone-stand-holder-3d-printed-adjustable.jpg",
        quantity: 1,
      },
    ],
    total: 85000,
  },
  {
    id: "ORD-2024-004",
    date: new Date("2024-11-15"),
    status: "delivered" as const,
    items: [
      {
        name: "Mặt nạ Samurai",
        image: "/samurai-mask-wall-decor-3d-printed-gold-black.jpg",
        quantity: 1,
      },
    ],
    total: 280000,
  },
];

const statusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "printing", label: "Đang in" },
  { value: "post-processing", label: "Xử lý nguội" },
  { value: "shipping", label: "Đang giao" },
  { value: "delivered", label: "Đã giao" },
];

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders =
    statusFilter === "all"
      ? allOrders
      : allOrders.filter((order) => order.status === statusFilter);

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Tất cả đơn hàng</h1>

        {/* Status Filter */}
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

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-foreground">
          <p className="text-lg font-medium mb-2">Không có đơn hàng nào</p>
          <p className="text-muted-foreground mb-4">
            Thử thay đổi bộ lọc trạng thái
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
