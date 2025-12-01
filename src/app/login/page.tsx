"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(emailOrUsername, password);
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel – Hero */}
      <div className="relative w-2/5 bg-linear-to-br from-green-700 to-green-900 text-white">
        {/* Ảnh nền từ thư mục public */}
        <Image
          src="/3d-printing-process-close-up-3d-printer-action_23-2152014109.png"
          alt="3D Printing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        
        <div className="relative h-full flex flex-col justify-center items-center px-12 text-center">
          <div className="mb-16">
            <h1 className="text-6xl font-bold mb-6 tracking-tight">3D PRINT SERVICE</h1>
            <p className="text-3xl font-light">Print Your 3D Vision</p>
          </div>
          <div className="text-xl opacity-95 space-y-2">
            <p>Từ ý tưởng đến sản phẩm thực tế</p>
            <p>Chỉ trong vài cú click</p>
          </div>
        </div>
      </div>

      {/* Right Panel – Form */}
      <div className="relative w-3/5 bg-white flex items-center justify-center px-20">
        <div className="w-full max-w-md">
          {/* Top links */}
          <div className="absolute top-8 left-8 right-8 flex justify-between text-sm">
            <Link href="/" className="text-green-700 hover:underline flex items-center gap-1 font-medium">
              ← Trở về Trang chủ
            </Link>
            <span className="text-gray-700">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-green-700 font-bold hover:underline">
                ĐĂNG KÝ NGAY
              </Link>
            </span>
          </div>

          {/* Main content */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
              CHÀO MỪNG QUAY LẠI
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Đăng nhập để tiếp tục in 3D
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Email hoặc Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 transition"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-full pr-14 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-full transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {loading ? "Đang đăng nhập..." : (
                  <>
                    Tiến hành đến tài khoản của tôi
                    <span className="text-2xl">→</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-600 text-sm">
              Bạn đang gặp vấn đề với mật khẩu?
            </p>
          </div>
        </div>

        {/* Hai dòng bạn muốn: góc trái dưới phần trắng */}
        <div className="absolute bottom-8 left-8 text-sm text-gray-500 space-y-1">
          <p className="opacity-50">Copyright © 2025 3D Print Service. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}