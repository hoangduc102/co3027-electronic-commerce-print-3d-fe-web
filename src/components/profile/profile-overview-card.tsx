import type { LucideIcon } from "lucide-react";
import { Calendar, Clock, Hash, Mail, Shield, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { UserProfile } from "@/types/user.types";

function getInitials(profile: UserProfile): string {
  const displayName = profile.username || profile.email || "";
  const parts = displayName.split(/[\s._-]+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return displayName.substring(0, 2).toUpperCase();
}

function formatDate(dateString?: string): string {
  if (!dateString) return "Chưa có thông tin";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Ngày không hợp lệ";
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-sm font-medium text-gray-900 mt-1 break-all">
          {value}
        </p>
      </div>
    </div>
  );
}

export function ProfileOverviewCard({ profile }: { profile: UserProfile }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-white text-2xl font-semibold">
              {getInitials(profile)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">
              {profile.username || "Người dùng"}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {profile.email || "Chưa có email"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={Hash}
                label="ID Người dùng"
                value={profile.id || "N/A"}
              />
              <InfoItem
                icon={User}
                label="Tên người dùng"
                value={profile.username || "N/A"}
              />
              <InfoItem
                icon={Mail}
                label="Email"
                value={profile.email || "N/A"}
              />
              <InfoItem
                icon={Shield}
                label="Vai trò"
                value={
                  profile.role === "ADMIN" ? "Quản trị viên" : "Khách hàng"
                }
              />
            </div>
          </div>

          {(profile.createdAt || profile.updatedAt) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin tài khoản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.createdAt && (
                  <InfoItem
                    icon={Calendar}
                    label="Ngày tạo tài khoản"
                    value={formatDate(profile.createdAt)}
                  />
                )}
                {profile.updatedAt && (
                  <InfoItem
                    icon={Clock}
                    label="Cập nhật lần cuối"
                    value={formatDate(profile.updatedAt)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
