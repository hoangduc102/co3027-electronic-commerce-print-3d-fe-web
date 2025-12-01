"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">3D</div>
              <span className="text-xl font-bold">Công Ty TNHH In 3D</span>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-green-700">Trang chủ</Link></li>
              <li><Link href="/order" className="hover:text-green-700">Đặt in</Link></li>
              <li><Link href="/templates" className="hover:text-green-700">Khám phá</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Công ty</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-700">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-green-700">Liên hệ</a></li>
              <li><a href="#" className="hover:text-green-700">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Pháp lý</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-700">Điều khoản</a></li>
              <li><a href="#" className="hover:text-green-700">Chính sách bảo mật</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          Copyright © 2025 3D Printer. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}