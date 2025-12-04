"use client";

import { Shield, Lock, CheckCircle, Award } from "lucide-react";

const badges = [
  {
    icon: Lock,
    title: "SSL Secured",
    description: "Kết nối an toàn 256-bit",
  },
  {
    icon: Shield,
    title: "Bảo mật thanh toán",
    description: "Thông tin được mã hóa",
  },
  {
    icon: CheckCircle,
    title: "Đã đăng ký BCT",
    description: "Bộ Công Thương xác nhận",
  },
  {
    icon: Award,
    title: "Cam kết chất lượng",
    description: "Hoàn tiền 100% nếu lỗi",
  },
];

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

export function TrustBadges({
  variant = "horizontal",
  className = "",
}: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div
        className={`flex items-center justify-center gap-4 py-3 ${className}`}
      >
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-1 text-muted-foreground"
          >
            <badge.icon className="h-4 w-4" />
            <span className="text-xs hidden sm:inline">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`space-y-3 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <badge.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{badge.title}</p>
              <p className="text-xs text-muted-foreground">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center text-center p-4 border-2 border-foreground bg-card"
        >
          <badge.icon className="h-8 w-8 text-primary mb-2" />
          <p className="font-medium text-sm">{badge.title}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
