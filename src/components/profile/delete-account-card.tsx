"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { userProfileService } from "@/services/user-profile.service";
import { FormError, PasswordInput } from "./password-input";

export function DeleteAccountCard() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setPassword("");
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Vui lòng nhập mật khẩu để xác nhận");
      return;
    }

    setIsSubmitting(true);
    try {
      await userProfileService.deleteAccount(password);
      await logout();
      router.push("/");
    } catch (err) {
      setError((err as Error).message || "Xóa tài khoản thất bại");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Xóa Tài Khoản
        </CardTitle>
        <CardDescription>
          Cảnh báo: Hành động này sẽ vô hiệu hóa tài khoản của bạn. Bạn sẽ không
          thể đăng nhập lại với tài khoản này.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                Hành động này sẽ vô hiệu hóa tài khoản của bạn và không thể hoàn
                tác. Bạn sẽ không thể đăng nhập lại với tài khoản này.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="deletePassword">
                    Nhập mật khẩu để xác nhận:
                  </Label>
                  <PasswordInput
                    id="deletePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    required
                  />
                </div>
                <FormError message={error} />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isSubmitting}
                >
                  Xóa Tài Khoản
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
