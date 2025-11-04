"use client";

import type React from "react";

import {
  Search,
  MessageCircle,
  Bell,
  X,
  User,
  LogOut,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

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

import { useRouter } from "next/navigation";

import { useState, useRef, useEffect } from "react";

import { useAuth } from "@/contexts/AuthContext";

export default function TopNavigation() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setSearchQuery("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      // You can add your search logic here
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // You can add real-time search here
    if (e.target.value.trim()) {
      // Add real-time search logic here
    }
  };

  // Focus input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Vẫn redirect về login ngay cả khi có lỗi
      setShowLogoutDialog(false);
      router.push("/login");
    }
  };

  // Lấy chữ cái đầu tiên của username hoặc email để hiển thị avatar fallback
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
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-end h-16 px-6">
        <div className="flex items-center space-x-4">
          {/* Search Section */}
          <div className="flex items-center">
            {isSearchExpanded ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-64 h-8"
                  onBlur={() => {
                    // Close search if empty and loses focus
                    if (!searchQuery.trim()) {
                      setTimeout(() => setIsSearchExpanded(false), 150);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8"
                  onClick={handleSearchToggle}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Đóng tìm kiếm</span>
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={handleSearchToggle}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Tìm kiếm</span>
              </Button>
            )}
          </div>

          {/* Messages */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => router.push("/dashboard/messages")}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Tin nhắn</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => router.push("/dashboard/notifications")}
          >
            <Bell className="h-5 w-5" />
            {/* Có thể thêm badge notification ở đây */}
            <span className="sr-only">Thông báo</span>
          </Button>

          {/* Shopping Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => router.push("/user/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {/* Có thể thêm badge số lượng sản phẩm ở đây */}
            <span className="sr-only">Giỏ hàng</span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="Avatar" src={undefined} />
                  <AvatarFallback className="bg-gray-500 text-white text-lg font-semibold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-52 cursor-pointer"
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowLogoutDialog(true)}
                className="flex items-center gap-2 cursor-pointer"
                variant="destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </nav>
  );
}
