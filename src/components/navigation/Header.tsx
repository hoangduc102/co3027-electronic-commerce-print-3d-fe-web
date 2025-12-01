"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link href="/" className="text-green-700 font-semibold">Trang chủ</Link>
          <Link href="/order" className="text-gray-700 hover:text-green-700">Đặt in</Link>
          <Link href="/templates" className="text-gray-700 hover:text-green-700">Khám phá</Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-700">Liên hệ</Link>
        </nav>

        {/* CART + LOGIN */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </Link>
          {user ? (
            <span className="text-sm font-medium">Hi, User!</span>
          ) : (
            <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
