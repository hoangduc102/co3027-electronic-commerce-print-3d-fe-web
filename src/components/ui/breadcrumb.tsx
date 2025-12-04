"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

// Mapping cho các route sang tiếng Việt
const routeLabels: Record<string, string> = {
  "": "Trang chủ",
  quote: "Báo giá",
  store: "Cửa hàng",
  materials: "Vật liệu",
  guidelines: "Hướng dẫn",
  showcase: "Showcase",
  checkout: "Thanh toán",
  about: "Về chúng tôi",
  contact: "Liên hệ",
  blog: "Blog",
  careers: "Tuyển dụng",
  partners: "Đối tác",
  support: "Hỗ trợ",
  search: "Tìm kiếm",
  terms: "Điều khoản",
  privacy: "Bảo mật",
  refund: "Hoàn tiền",
  shipping: "Vận chuyển",
  login: "Đăng nhập",
  register: "Đăng ký",
  "forgot-password": "Quên mật khẩu",
  dashboard: "Dashboard",
  orders: "Đơn hàng",
  files: "File của tôi",
  user: "Tài khoản",
  profile: "Hồ sơ",
};

interface BreadcrumbItem {
  label: string;
  href: string;
  isLast: boolean;
}

export function Breadcrumb() {
  const pathname = usePathname();

  // Bỏ qua các route không cần breadcrumb
  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "(public)");

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/", isLast: false },
    ...segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = routeLabels[segment] || segment;
      return {
        label,
        href,
        isLast: index === segments.length - 1,
      };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index === 0 ? (
              <Link
                href={crumb.href}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">{crumb.label}</span>
              </Link>
            ) : (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                {crumb.isLast ? (
                  <span className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
