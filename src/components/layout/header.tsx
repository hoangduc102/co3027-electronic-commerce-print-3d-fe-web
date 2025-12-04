"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, ShoppingCart, User, Search, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  {
    name: "Dịch vụ In 3D",
    href: "/quote",
    description: "Upload file & báo giá tức thì",
  },
  {
    name: "Cửa hàng Mẫu",
    href: "/store",
    description: "Mẫu có sẵn, in theo yêu cầu",
  },
  {
    name: "Vật liệu",
    href: "/materials",
    description: "Thông tin các loại nhựa in",
  },
  {
    name: "Hướng dẫn",
    href: "/guidelines",
    description: "Thiết kế file chuẩn in 3D",
  },
  {
    name: "Showcase",
    href: "/showcase",
    description: "Gallery dự án thực tế",
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setShowLogoutDialog(false);
      router.push("/login");
    }
  };

  const getInitials = () => {
    if (user?.username) {
      return user.username.trim().charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Global Alert Banner */}
      <div className="bg-foreground text-background py-2 px-4 text-center text-sm">
        <span className="font-medium">Thời gian sản xuất hiện tại:</span> Đơn
        hàng mất 3-5 ngày để hoàn thành
      </div>

      {/* Main Header */}
      <div className="bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Print3D.vn Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                Print3D.vn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors border-2 border-transparent hover:border-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex border-2 border-transparent hover:border-foreground"
                onClick={() => router.push("/search")}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Tìm kiếm</span>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative border-2 border-transparent hover:border-foreground"
              >
                <Link href="/checkout">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    2
                  </span>
                  <span className="sr-only">Giỏ hàng</span>
                </Link>
              </Button>

              {/* User Account - Show if logged in */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full border-2 border-transparent hover:border-foreground"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage alt="Avatar" src={undefined} />
                        <AvatarFallback className="bg-gray-500 text-white text-lg font-semibold">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-52 cursor-pointer border-2 border-foreground"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuItem
                      onClick={() => router.push("/user/profile")}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      <span>Hồ sơ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/orders")}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Đơn hàng</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/files")}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Search className="h-4 w-4" />
                      <span>Thư viện file</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowLogoutDialog(true)}
                      className="flex items-center gap-2 cursor-pointer text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* Login Button - Show if not logged in */
                <Button
                  asChild
                  className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold"
                >
                  <Link href="/login">Đăng nhập</Link>
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden border-2 border-transparent hover:border-foreground"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 border-l-2 border-foreground"
                >
                  <div className="flex flex-col gap-4 mt-8">
                    {/* Search Button for Mobile */}
                    <Link
                      href="/search"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-3 px-2 hover:bg-secondary border-2 border-foreground"
                    >
                      <Search className="h-5 w-5" />
                      <span className="font-medium">Tìm kiếm</span>
                    </Link>

                    {!user && (
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold"
                      >
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Đăng nhập
                        </Link>
                      </Button>
                    )}

                    <div className="border-t-2 border-foreground pt-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col py-3 px-2 hover:bg-secondary border-2 border-transparent hover:border-foreground"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đăng xuất</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
