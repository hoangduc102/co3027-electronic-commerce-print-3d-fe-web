"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { userProfileService } from "@/services/user-profile.service";
import {
  UserProfile,
  UpdateProfileDto,
  ChangePasswordDto,
} from "@/types/user.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RefreshCw,
  User,
  Mail,
  Hash,
  Shield,
  Calendar,
  Clock,
  Edit,
  Key,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user: contextUser, refreshUser, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Update profile form states
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Change password form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Delete account form states
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  // Lấy thông tin profile đầy đủ từ API khi component mount
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync form với profile khi profile thay đổi
  useEffect(() => {
    if (profile) {
      setUpdateUsername(profile.username);
      setUpdateEmail(profile.email);
    }
  }, [profile]);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userProfile = await userProfileService.getProfile();
      // Debug log để kiểm tra data
      console.log("Profile loaded:", userProfile);
      setProfile(userProfile);
      // Cập nhật context user nếu có refreshUser function
      if (refreshUser) {
        await refreshUser();
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error loading profile:", error);
      setError(
        error.message || "Không thể tải thông tin hồ sơ. Vui lòng thử lại."
      );
      // Fallback về user từ context nếu có
      if (contextUser) {
        console.log("Fallback to contextUser:", contextUser);
        setProfile({
          ...contextUser,
          isActive: true,
          createdAt: "",
          updatedAt: "",
        } as UserProfile);
      } else {
        // Nếu không có contextUser, set profile là null để hiển thị error state
        setProfile(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await refreshUser();
      await loadProfile();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Không thể làm mới thông tin.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess(false);

    // Validation
    if (!updateUsername && !updateEmail) {
      setUpdateError("Vui lòng nhập ít nhất một trường để cập nhật");
      return;
    }

    if (
      updateUsername &&
      (updateUsername.length < 3 || updateUsername.length > 50)
    ) {
      setUpdateError("Username phải có từ 3-50 ký tự");
      return;
    }

    if (updateUsername && !/^\w+$/.test(updateUsername)) {
      setUpdateError("Username chỉ chứa chữ cái, số và dấu gạch dưới");
      return;
    }

    if (updateEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateEmail)) {
      setUpdateError("Email không hợp lệ");
      return;
    }

    // Chỉ gửi các trường đã thay đổi
    const updateData: UpdateProfileDto = {};
    if (profile && updateUsername !== profile.username) {
      updateData.username = updateUsername;
    }
    if (profile && updateEmail !== profile.email) {
      updateData.email = updateEmail;
    }

    if (Object.keys(updateData).length === 0) {
      setUpdateError("Không có thay đổi nào");
      return;
    }

    try {
      await userProfileService.updateProfile(updateData);
      setUpdateSuccess(true);
      setIsEditingProfile(false);
      await loadProfile(); // Refresh profile
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || "Cập nhật thất bại";
      setUpdateError(errorMessage);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Vui lòng điền đầy đủ các trường");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Mật khẩu mới phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&)"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("Mật khẩu mới phải khác mật khẩu hiện tại");
      return;
    }

    try {
      const data: ChangePasswordDto = { currentPassword, newPassword };
      await userProfileService.changePassword(data);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || "Đổi mật khẩu thất bại";
      setPasswordError(errorMessage);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");

    if (!deletePassword) {
      setDeleteError("Vui lòng nhập mật khẩu để xác nhận");
      return;
    }

    // Xác nhận lại
    const confirmed = globalThis.window.confirm(
      "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác."
    );

    if (!confirmed) {
      return;
    }

    try {
      await userProfileService.deleteAccount(deletePassword);
      // Sau khi xóa tài khoản thành công, đăng xuất và redirect
      await logout();
      router.push("/");
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || "Xóa tài khoản thất bại";
      setDeleteError(errorMessage);
    }
  };

  // Tạo initials từ username hoặc email
  const getInitials = (): string => {
    const displayName = profile?.username || profile?.email || "";
    const parts = displayName.split(/[\s._-]+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  };

  // Format ngày tháng theo định dạng tiếng Việt
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Chưa có thông tin";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "Ngày không hợp lệ";
    }
  };

  // Format role
  const formatRole = (role?: string): string => {
    return role === "ADMIN" ? "Quản trị viên" : "Khách hàng";
  };

  // Hiển thị loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="text-gray-600">Đang tải thông tin hồ sơ...</p>
      </div>
    );
  }

  // Sử dụng profile nếu có, fallback về contextUser
  const displayProfile = (() => {
    if (profile) {
      return profile;
    }
    if (contextUser) {
      return {
        ...contextUser,
        isActive: true,
        createdAt: "",
        updatedAt: "",
      } as UserProfile;
    }
    return null;
  })();

  // Debug log để kiểm tra displayProfile
  console.log("displayProfile:", displayProfile);
  console.log("profile state:", profile);
  console.log("contextUser:", contextUser);

  // Hiển thị error state nếu không có profile
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
      {/* Header */}
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

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Success messages */}
      {updateSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Cập nhật thành công!
        </div>
      )}

      {passwordSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Đổi mật khẩu thành công!
        </div>
      )}

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-white text-2xl font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">
                {displayProfile?.username || "Người dùng"}
              </CardTitle>
              <CardDescription className="text-base mt-1">
                {displayProfile.email || "Chưa có email"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Thông tin cơ bản */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User ID */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">ID Người dùng</p>
                    <p className="text-sm font-medium text-gray-900 mt-1 break-all">
                      {displayProfile?.id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Tên người dùng</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {displayProfile?.username || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-sm font-medium text-gray-900 mt-1 break-all">
                      {displayProfile?.email || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Vai trò</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {formatRole(displayProfile?.role)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin ngày tháng */}
            {(displayProfile.createdAt || displayProfile.updatedAt) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin tài khoản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Created At */}
                  {displayProfile.createdAt && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          Ngày tạo tài khoản
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {formatDate(displayProfile.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Updated At */}
                  {displayProfile.updatedAt && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Clock className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          Cập nhật lần cuối
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {formatDate(displayProfile.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cập Nhật Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Cập Nhật Thông Tin
              </CardTitle>
              <CardDescription>
                Thay đổi username hoặc email của bạn
              </CardDescription>
            </div>
            <Button
              variant={isEditingProfile ? "outline" : "default"}
              onClick={() => {
                setIsEditingProfile(!isEditingProfile);
                setUpdateError("");
                setUpdateSuccess(false);
              }}
            >
              {isEditingProfile ? "Hủy" : "Chỉnh sửa"}
            </Button>
          </div>
        </CardHeader>
        {isEditingProfile && (
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="updateUsername">Username</Label>
                <Input
                  id="updateUsername"
                  type="text"
                  value={updateUsername}
                  onChange={(e) => setUpdateUsername(e.target.value)}
                  placeholder="Nhập username mới"
                  minLength={3}
                  maxLength={50}
                  pattern="[a-zA-Z0-9_]+"
                />
                <p className="text-xs text-gray-500">
                  Chỉ chứa chữ cái, số và dấu gạch dưới (3-50 ký tự)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="updateEmail">Email</Label>
                <Input
                  id="updateEmail"
                  type="email"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                  placeholder="Nhập email mới"
                />
              </div>

              {updateError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-sm">
                  {updateError}
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit">Cập Nhật</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditingProfile(false);
                    setUpdateError("");
                    if (profile) {
                      setUpdateUsername(profile.username);
                      setUpdateEmail(profile.email);
                    }
                  }}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Đổi Mật Khẩu Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Đổi Mật Khẩu
              </CardTitle>
              <CardDescription>
                Cập nhật mật khẩu tài khoản của bạn
              </CardDescription>
            </div>
            <Button
              variant={isChangingPassword ? "outline" : "default"}
              onClick={() => {
                setIsChangingPassword(!isChangingPassword);
                setPasswordError("");
                setPasswordSuccess(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              {isChangingPassword ? "Hủy" : "Đổi mật khẩu"}
            </Button>
          </div>
        </CardHeader>
        {isChangingPassword && (
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Tối thiểu 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc
                  biệt (@$!%*?&)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-sm">
                  {passwordError}
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit">Đổi Mật Khẩu</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordError("");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Xóa Tài Khoản Card */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Xóa Tài Khoản
          </CardTitle>
          <CardDescription>
            Cảnh báo: Hành động này sẽ vô hiệu hóa tài khoản của bạn. Bạn sẽ
            không thể đăng nhập lại với tài khoản này.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDeletingAccount} onOpenChange={setIsDeletingAccount}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa Tài Khoản
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác Nhận Xóa Tài Khoản</DialogTitle>
                <DialogDescription>
                  Hành động này sẽ vô hiệu hóa tài khoản của bạn. Bạn sẽ không
                  thể đăng nhập lại với tài khoản này.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleDeleteAccount}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="deletePassword">
                      Nhập mật khẩu để xác nhận:
                    </Label>
                    <div className="relative">
                      <Input
                        id="deletePassword"
                        type={showDeletePassword ? "text" : "password"}
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="Nhập mật khẩu của bạn"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowDeletePassword(!showDeletePassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showDeletePassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {deleteError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-sm">
                      {deleteError}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDeletingAccount(false);
                      setDeletePassword("");
                      setDeleteError("");
                    }}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" variant="destructive">
                    Xóa Tài Khoản
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
