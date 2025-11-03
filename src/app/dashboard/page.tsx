"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Chào mừng, {user?.username || user?.email}
      </h1>
      <p className="text-gray-600">Bạn đã đăng nhập thành công!</p>
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <span className="font-semibold text-gray-900">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Username:</span>{" "}
            {user?.username}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Vai trò:</span>{" "}
            {user?.role === "CUSTOMER" ? "Khách hàng" : "Quản trị viên"}
          </p>
        </div>
      </div>
    </div>
  );
}
