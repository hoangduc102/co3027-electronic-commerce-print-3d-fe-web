"use client";

import { useState } from "react";
import { Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { userProfileService } from "@/services/user-profile.service";
import { FormError, PasswordInput } from "./password-input";
import { validatePasswordChange } from "./validation";

export function ChangePasswordCard({ onChanged }: { onChanged: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const close = () => {
    setIsOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validatePasswordChange(
      currentPassword,
      newPassword,
      confirmPassword
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await userProfileService.changePassword({ currentPassword, newPassword });
      close();
      onChanged();
    } catch (err) {
      setError((err as Error).message || "Đổi mật khẩu thất bại");
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
              <Key className="h-5 w-5" />
              Đổi Mật Khẩu
            </CardTitle>
            <CardDescription>
              Cập nhật mật khẩu tài khoản của bạn
            </CardDescription>
          </div>
          <Button
            variant={isOpen ? "outline" : "default"}
            onClick={isOpen ? close : () => setIsOpen(true)}
          >
            {isOpen ? "Hủy" : "Đổi mật khẩu"}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <PasswordInput
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <PasswordInput
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500">
                Tối thiểu 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc
                biệt (@$!%*?&amp;)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <FormError message={error} />

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                Đổi Mật Khẩu
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
