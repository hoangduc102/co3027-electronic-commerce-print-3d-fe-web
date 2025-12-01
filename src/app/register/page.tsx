"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, isLoading, router]);

  const validateForm = (): boolean => {
    const errors: any = {};
    if (username.length < 3 || username.length > 50)
      errors.username = "Username phải từ 3-50 ký tự";
    else if (!/^[a-zA-Z0-9_]+$/.test(username))
      errors.username = "Chỉ chứa chữ cái, số và gạch dưới";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Email không hợp lệ";

    if (password.length < 8)
      errors.password = "Mật khẩu ít nhất 8 ký tự";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password))
      errors.password = "Cần chữ hoa, thường, số và ký tự đặc biệt";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setValidationErrors({}); setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(username, email, password);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel – Hero */}
      <div className="relative w-2/5 bg-linear-to-br from-green-700 to-green-900 text-white">
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
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-green-700 font-bold hover:underline">
                ĐĂNG NHẬP NGAY
              </Link>
            </span>
          </div>

          {/* Main content */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
              TRỞ THÀNH THÀNH VIÊN
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Tham gia cộng đồng in 3D ngay hôm nay
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm text-center">
                  Đăng ký thành công! Đang chuyển đến trang đăng nhập...
                </div>
              )}

              {/* Username */}
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 transition"
                />
                {validationErrors.username && (
                  <p className="text-red-600 text-sm mt-1 ml-2">{validationErrors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 transition"
                />
                {validationErrors.email && (
                  <p className="text-red-600 text-sm mt-1 ml-2">{validationErrors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-16 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
                {validationErrors.password && (
                  <p className="text-red-600 text-sm mt-1 ml-2">{validationErrors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-full transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {loading ? "Đang tạo tài khoản..." : (
                  <>
                    Trở thành thành viên
                    <span className="text-2xl">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Hai dòng ở góc trái dưới phần trắng – giống hệt Login */}
        <div className="absolute bottom-8 left-8 text-sm text-gray-500 space-y-1">
          <p className="opacity-50">Copyright © 2025 3D Print Service. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}