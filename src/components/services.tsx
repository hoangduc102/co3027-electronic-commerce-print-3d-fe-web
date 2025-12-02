"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Home as Home2, LayoutGrid } from "lucide-react";

interface ServiceCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services: ServiceCard[] = [
    {
      id: 1,
      icon: <Home2 className="w-8 h-8 text-primary" />,
      title: "Đặt in",
      description: "Lorem ipsum dolor sit amet consec tetur adipisicing elit.",
      buttonText: "Đặt ngay",
    },
    {
      id: 2,
      icon: <LayoutGrid className="w-8 h-8 text-primary" />,
      title: "In theo mẫu",
      description: "Lorem ipsum dolor sit amet consec tetur adipisicing elit.",
      buttonText: "Xem thêm",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground animate-fadeInUp"
            style={{ animationDelay: "0ms" }}
          >
            Dịch Vụ Của Chúng Tôi
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`p-8 bg-white rounded-xl border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scaleIn ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${100 + idx * 150}ms`,
              }}
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex p-3 bg-accent rounded-lg">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Button */}
              <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg active:scale-95">
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
