"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { userProfileService } from "@/services/user-profile.service";
import type { UserProfile } from "@/types/user.types";
import { ProfileOverviewCard } from "@/components/profile/profile-overview-card";
import { UpdateProfileCard } from "@/components/profile/update-profile-card";
import { ChangePasswordCard } from "@/components/profile/change-password-card";
import { DeleteAccountCard } from "@/components/profile/delete-account-card";
import { SuccessBanner } from "@/components/profile/success-banner";

export default function ProfilePage() {
  const { user: contextUser, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setError(null);
    try {
      setProfile(await userProfileService.getProfile());
    } catch (err) {
      setError(
        (err as Error).message ||
          "Không thể tải thông tin hồ sơ. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([loadProfile(), refreshUser()]);
    setIsRefreshing(false);
  };

  const handleProfileUpdated = async () => {
    // Đồng bộ cả hồ sơ lẫn user trong AuthContext (header, dashboard...)
    await Promise.all([loadProfile(), refreshUser()]);
    showSuccess("Cập nhật thành công!");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="text-gray-600">Đang tải thông tin hồ sơ...</p>
      </div>
    );
  }

  // Không tải được hồ sơ đầy đủ → hiển thị tạm thông tin cơ bản từ AuthContext
  const displayProfile: UserProfile | null =
    profile ??
    (contextUser
      ? { ...contextUser, isActive: true, createdAt: "", updatedAt: "" }
      : null);

  if (!displayProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-600">
          {error || "Không thể tải thông tin hồ sơ."}
        </p>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="text-gray-600 mt-1">
            Xem và quản lý thông tin tài khoản của bạn
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Đang tải..." : "Làm mới"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && <SuccessBanner message={successMessage} />}

      <ProfileOverviewCard profile={displayProfile} />
      <UpdateProfileCard
        profile={displayProfile}
        onUpdated={handleProfileUpdated}
      />
      <ChangePasswordCard
        onChanged={() => showSuccess("Đổi mật khẩu thành công!")}
      />
      <DeleteAccountCard />
    </div>
  );
}
