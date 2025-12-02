"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { user } = useAuth();
  const { items } = useCart();

  const cartQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="3D Print Service"
            width={40}
            height={40}
            className="rounded-lg"
          />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link href="/" className="text-green-700 font-bold">Trang chủ</Link>
          <Link href="/order" className="text-gray-700 hover:text-green-700 transition">Đặt in</Link>
          <Link href="/templates" className="text-gray-700 hover:text-green-700 transition">Khám phá</Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-700 transition">Liên hệ</Link>
        </nav>

        {/* CART + USER */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartQuantity}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden lg:block">Hi, {user.username}!</span>
            </div>
          ) : (
            <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition shadow-md">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}