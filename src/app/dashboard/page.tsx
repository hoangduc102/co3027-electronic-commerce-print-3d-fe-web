"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/dashboard/order-card";
import { Package, FileBox, User, Upload, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data
const recentOrders = [
  {
    id: "ORD-2024-001",
    date: new Date("2024-12-01"),
    status: "printing" as const,
    items: [
      {
        name: "Tượng Rồng Phong Thủy",
        image: "/dragon-statue.jpg",
        quantity: 1,
      },
      { name: "Núm vặn Hexagon", image: "/hexagon-knob.jpg", quantity: 4 },
    ],
    total: 450000,
  },
  {
    id: "ORD-2024-002",
    date: new Date("2024-11-28"),
    status: "delivered" as const,
    items: [
      { name: "Figure Chibi Anime", image: "/chibi-figure.jpg", quantity: 2 },
    ],
    total: 360000,
  },
];

const savedFiles = [
  {
    id: "1",
    name: "custom_part_v2.stl",
    uploadedAt: new Date("2024-11-15"),
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "logo_3d.obj",
    uploadedAt: new Date("2024-11-10"),
    size: "1.1 MB",
  },
  {
    id: "3",
    name: "phone_case.step",
    uploadedAt: new Date("2024-10-28"),
    size: "5.2 MB",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
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
        {[
          {
            icon: Package,
            label: "Đang xử lý",
            value: "2",
            color: "text-amber-600",
          },
          {
            icon: FileBox,
            label: "File đã lưu",
            value: "12",
            color: "text-blue-600",
          },
          {
            icon: User,
            label: "Đơn hoàn thành",
            value: "8",
            color: "text-green-600",
          },
          {
            icon: Upload,
            label: "Tổng đã in",
            value: "24 mẫu",
            color: "text-primary",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border-2 border-foreground p-4 bg-card"
          >
            <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold">{stat.value}</p>
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

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
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
            {savedFiles.map((file, index) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-4 ${
                  index < savedFiles.length - 1
                    ? "border-b-2 border-foreground"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-secondary border-2 border-foreground flex items-center justify-center flex-shrink-0">
                    <FileBox className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} •{" "}
                      {file.uploadedAt.toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-foreground flex-shrink-0 bg-transparent"
                >
                  In lại
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Upload */}
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
