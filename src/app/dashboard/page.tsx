"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/dashboard/order-card";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  FileBox,
  Loader2,
  Package,
  Printer,
  Upload,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useMyOrders } from "@/hooks/use-orders";
import { useMyPrintFiles } from "@/hooks/use-print-files";
import {
  printFileDisplayName,
  printFileUploadedAt,
  reorderPrintFile,
} from "@/lib/custom-print";
import type { Product } from "@/schemas/product.schema";
import type { OrderStatus } from "@/types/order";

const IN_PROGRESS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PRINTING",
  "SHIPPED",
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();
  const { data: files = [], isLoading: filesLoading } = useMyPrintFiles();
  const [addedId, setAddedId] = useState<string | null>(null);

  const deliveredOrders = orders.filter((o) => o.status === "DELIVERED");
  const stats = [
    {
      icon: Package,
      label: "Đang xử lý",
      value: orders.filter((o) => IN_PROGRESS.includes(o.status)).length,
      color: "text-amber-600",
    },
    {
      icon: FileBox,
      label: "File đã lưu",
      value: files.length,
      color: "text-blue-600",
    },
    {
      icon: CheckCircle2,
      label: "Đơn hoàn thành",
      value: deliveredOrders.length,
      color: "text-green-600",
    },
    {
      icon: Printer,
      label: "Tổng đã in",
      value: `${deliveredOrders.reduce(
        (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
        0
      )} mẫu`,
      color: "text-primary",
    },
  ];

  const handleReorder = (product: Product) => {
    const item = reorderPrintFile(product);
    if (!item) return;
    addToCart(item);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const recentOrders = orders.slice(0, 2);
  const recentFiles = files.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Xin chào, {user?.username || user?.email}
        </h1>
        <p className="text-muted-foreground">
          Quản lý đơn hàng và thư viện file của bạn
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-2 border-foreground p-4 bg-card"
          >
            <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold">
              {ordersLoading || filesLoading ? "…" : stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl uppercase tracking-wide">
              Đơn hàng gần đây
            </h2>
            <Button asChild variant="link" className="text-primary p-0">
              <Link href="/dashboard/orders">
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          {ordersLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-foreground">
              <p className="font-medium mb-3">Bạn chưa có đơn hàng nào</p>
              <Button
                asChild
                variant="outline"
                className="border-2 border-foreground"
              >
                <Link href="/store">Khám phá cửa hàng</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Saved Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl uppercase tracking-wide">
              Thư viện file
            </h2>
            <Button asChild variant="link" className="text-primary p-0">
              <Link href="/dashboard/files">
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="border-2 border-foreground bg-card">
            {filesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : recentFiles.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground text-center">
                Chưa có file nào. File sẽ được lưu khi bạn đặt in từ trang báo
                giá.
              </p>
            ) : (
              recentFiles.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex items-center justify-between p-4 ${
                    index < recentFiles.length - 1
                      ? "border-b-2 border-foreground"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0">
                      <FileBox className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {printFileDisplayName(product)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {printFileUploadedAt(product)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-foreground flex-shrink-0 bg-transparent"
                    disabled={!product.variants[0]}
                    onClick={() => handleReorder(product)}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="h-3 w-3 mr-1" /> Đã thêm
                      </>
                    ) : (
                      "In lại"
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold gap-2"
            >
              <Link href="/quote">
                <Upload className="h-4 w-4" />
                Upload file mới
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
