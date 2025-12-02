"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 animate-fadeInUp"
            style={{ animationDelay: "0ms" }}
          >
            <div className="w-8 h-8 relative">
              <Image
                src="/Logo.svg"
                alt="3D Printer Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg text-foreground">
              3D Printer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {["Trang chủ", "Đặt in", "Khám phá", "Liên hệ"].map((item, idx) => {
              const getHref = (itemName: string) => {
                switch (itemName) {
                  case "Trang chủ":
                    return "/";
                  case "Đặt in":
                    return "/order";
                  case "Khám phá":
                    return "/explore";
                  case "Liên hệ":
                    return "/contact";
                  default:
                    return "#";
                }
              };
              return (
                <Link
                  key={item}
                  href={getHref(item)}
                  className="text-foreground hover:text-primary transition-colors animate-fadeInUp"
                  style={{ animationDelay: `${100 + idx * 100}ms` }}
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/user/cart">
              <button
                className="p-2 hover:bg-accent rounded-lg transition-colors animate-fadeInUp"
                style={{ animationDelay: "600ms" }}
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
              </button>
            </Link>
            <Link href="/login">
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all animate-fadeInUp"
                style={{ animationDelay: "700ms" }}
              >
                Đăng nhập
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-border animate-slideInDown">
            <div className="flex flex-col gap-4 pt-4">
              {["Trang chủ", "Đặt in", "Khám phá", "Liên hệ"].map((item) => {
                const getHref = (itemName: string) => {
                  switch (itemName) {
                    case "Trang chủ":
                      return "/";
                    case "Đặt in":
                      return "/order";
                    case "Khám phá":
                      return "/explore";
                    case "Liên hệ":
                      return "/contact";
                    default:
                      return "#";
                  }
                };
                return (
                  <Link
                    key={item}
                    href={getHref(item)}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                );
              })}
              <Link href="/login">
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all">
                  Đăng nhập
                </button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
