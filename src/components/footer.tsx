"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 relative">
                <Image
                  src="/Logo.svg"
                  alt="3D Printer Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-foreground">3D Printer</span>
            </div>
            <p className="text-foreground/70 text-sm">Công ty Trẻm In 3D</p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: "100ms" }}>
            <h4 className="font-bold text-foreground mb-4">Links</h4>
            <ul className="space-y-2">
              {["Trang chủ", "Khám phá", "Dịch vụ"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            <h4 className="font-bold text-foreground mb-4">Công ty</h4>
            <ul className="space-y-2">
              {["Về chúng tôi", "Liên hệ", "FAQ"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="animate-fadeInUp" style={{ animationDelay: "300ms" }}>
            <h4 className="font-bold text-foreground mb-4">Pháp lý</h4>
            <ul className="space-y-2">
              {["Điều khoản dịch vụ", "Chính sách bảo mật"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t border-border pt-8 text-center text-foreground/60 text-sm animate-fadeInUp"
          style={{ animationDelay: "400ms" }}
        >
          <p>Copyright 2025 © 3D Printer. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
