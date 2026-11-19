"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userProfileService } from "@/services/user-profile.service";
import type { UpdateProfileDto, UserProfile } from "@/types/user.types";
import { FormError } from "./password-input";
import { validateProfileUpdate } from "./validation";

interface UpdateProfileCardProps {
  profile: UserProfile;
  /** Gọi sau khi cập nhật thành công để tải lại hồ sơ */
  onUpdated: () => Promise<void>;
}

export function UpdateProfileCard({
  profile,
  onUpdated,
}: UpdateProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = () => {
    // Luôn bắt đầu từ dữ liệu hồ sơ mới nhất
    setUsername(profile.username);
    setEmail(profile.email);
    setError("");
    setIsEditing(true);
  };

  const close = () => {
    setIsEditing(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateProfileUpdate(username, email);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Chỉ gửi các trường đã thay đổi
    const data: UpdateProfileDto = {};
    if (username !== profile.username) data.username = username;
    if (email !== profile.email) data.email = email;
    if (Object.keys(data).length === 0) {
      setError("Không có thay đổi nào");
      return;
    }

    setIsSubmitting(true);
    try {
      await userProfileService.updateProfile(data);
      setIsEditing(false);
      await onUpdated();
    } catch (err) {
      setError((err as Error).message || "Cập nhật thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            variant={isEditing ? "outline" : "default"}
            onClick={isEditing ? close : open}
          >
            {isEditing ? "Hủy" : "Chỉnh sửa"}
          </Button>
        </div>
      </CardHeader>
      {isEditing && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="updateUsername">Username</Label>
              <Input
                id="updateUsername"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email mới"
              />
            </div>

            <FormError message={error} />

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                Cập Nhật
              </Button>
              <Button type="button" variant="outline" onClick={close}>
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
