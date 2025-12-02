"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1
              className="text-4xl sm:text-5xl font-bold text-foreground leading-tight animate-fadeInUp"
              style={{ animationDelay: "100ms" }}
            >
              Print Your <span className="text-primary">3D Vision</span>
            </h1>

            <p
              className="text-lg text-foreground/70 leading-relaxed animate-fadeInUp"
              style={{ animationDelay: "200ms" }}
            >
              Lorem ipsum dolor sit amet consec tetur adipisicing elit. Repre
              henderit at cupiditate consectetur incidunt eius.
            </p>

            <button
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: "300ms" }}
            >
              Tìm hiểu thêm
            </button>
          </div>

          {/* Right Image */}
          <div
            className="relative h-96 animate-slideInRight"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/image.svg"
                alt="3D Printer in action"
                fill
                className="object-contain animate-float"
                priority
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
