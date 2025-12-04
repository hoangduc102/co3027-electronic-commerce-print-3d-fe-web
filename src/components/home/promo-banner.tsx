"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Gift, Percent, Truck } from "lucide-react";

const promos = [
  {
    id: 1,
    icon: Gift,
    title: "KHÁCH HÀNG MỚI",
    description: "Giảm 15% cho đơn hàng đầu tiên",
    code: "WELCOME15",
    link: "/quote",
    bgColor: "bg-gradient-to-r from-primary to-primary/80",
  },
  {
    id: 2,
    icon: Percent,
    title: "GIẢM GIÁ CUỐI NĂM",
    description: "Giảm đến 25% tất cả đơn hàng",
    code: "NEWYEAR25",
    link: "/store",
    bgColor: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
  {
    id: 3,
    icon: Truck,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "Đơn hàng từ 500.000đ",
    code: null,
    link: "/shipping",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const currentPromo = promos[currentIndex];
  const IconComponent = currentPromo.icon;

  return (
    <div className={`${currentPromo.bgColor} text-white py-3 px-4 relative`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 text-center">
          <IconComponent className="h-5 w-5 shrink-0 hidden sm:block" />
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="font-bold text-sm sm:text-base">
              {currentPromo.title}
            </span>
            <span className="text-sm text-white/90">
              {currentPromo.description}
            </span>
            {currentPromo.code && (
              <span className="bg-white/20 px-2 py-0.5 text-xs font-mono rounded">
                {currentPromo.code}
              </span>
            )}
          </div>
          <Link href={currentPromo.link}>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-foreground hover:bg-white/90 text-xs h-7 hidden sm:flex"
            >
              Xem ngay
            </Button>
          </Link>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
