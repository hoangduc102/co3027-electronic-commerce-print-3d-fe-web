"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

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
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Đang tải...</p>
          </div>
        </main>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    // Validate username
    if (username.length < 3 || username.length > 50) {
      errors.username = "Username phải có từ 3-50 ký tự";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = "Username chỉ chứa chữ cái, số và dấu gạch dưới";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Email không hợp lệ";
    }

    // Validate password
    if (password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      if (!passwordRegex.test(password)) {
        errors.password =
          "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      setSuccess(true);
      setError("");
      // Hiển thị thông báo thành công trước khi redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500); // Đợi 1.5 giây để user thấy thông báo
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đăng ký thất bại";
      setError(message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="border-2 border-foreground bg-card p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
              <p className="text-muted-foreground mt-2">
                Tạo tài khoản để theo dõi đơn hàng và lưu file
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 mb-6 text-sm text-green-600 bg-green-50 rounded-md border border-green-200 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Đăng ký thành công! Đang chuyển đến trang đăng nhập...
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="john_doe"
                    pattern="[a-zA-Z0-9_]+"
                    className="pl-10 border-2 border-foreground"
                    required
                  />
                </div>
                {validationErrors.username && (
                  <p className="text-sm text-red-600">
                    {validationErrors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="pl-10 border-2 border-foreground"
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự"
                    className="pl-10 pr-10 border-2 border-foreground"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    className="mt-1"
                    checked={acceptTerms}
                    onCheckedChange={(checked) =>
                      setAcceptTerms(checked === true)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal leading-relaxed cursor-pointer"
                  >
                    Tôi đồng ý với{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Điều khoản dịch vụ
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Chính sách bảo mật
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="newsletter" className="mt-1" />
                  <Label
                    htmlFor="newsletter"
                    className="text-sm font-normal leading-relaxed cursor-pointer"
                  >
                    Nhận email thông báo về khuyến mãi và sản phẩm mới
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 border-2 border-foreground font-semibold mt-4"
                disabled={loading || !acceptTerms}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Đang tạo tài khoản...
                  </span>
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
