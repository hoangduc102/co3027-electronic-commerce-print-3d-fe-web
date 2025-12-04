"use client";
import { MATERIALS, TECHNOLOGIES } from "@/lib/constants";
import { Info } from "lucide-react";

const PropertyBar = ({ value, label }: { value: number; label: string }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}/5</span>
    </div>
    <div className="h-2 bg-secondary border border-foreground">
      <div
        className="h-full bg-primary"
        style={{ width: `${(value / 5) * 100}%` }}
      />
    </div>
  </div>
);

export default function MaterialsPage() {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value) + "đ";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Thư viện Vật liệu
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Tìm hiểu về các loại vật liệu in 3D để chọn lựa phù hợp với dự án
              của bạn. Mỗi loại có đặc tính riêng về độ bền, độ dẻo, khả năng
              chịu nhiệt và độ chi tiết.
            </p>
          </div>

          {/* Technologies Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {TECHNOLOGIES.map((tech) => (
              <div
                key={tech.id}
                className="border-2 border-foreground p-6 bg-card"
              >
                <h3 className="font-bold text-xl mb-2">{tech.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          {/* Materials Grid */}
          <h2 className="font-bold text-2xl mb-6 uppercase tracking-wide">
            Chi tiết vật liệu
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map((material) => (
              <div
                key={material.id}
                className="border-2 border-foreground bg-card overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b-2 border-foreground bg-secondary flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl">{material.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {
                        TECHNOLOGIES.find((t) => t.id === material.technology)
                          ?.name
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Giá từ</p>
                    <p className="font-bold text-primary">
                      {formatPrice(material.pricePerGram)}/g
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {material.description}
                  </p>

                  {/* Properties */}
                  <div className="space-y-3 mb-4">
                    <PropertyBar
                      value={material.properties.strength}
                      label="Độ bền"
                    />
                    <PropertyBar
                      value={material.properties.flexibility}
                      label="Độ dẻo"
                    />
                    <PropertyBar
                      value={material.properties.heatResistance}
                      label="Chịu nhiệt"
                    />
                    <PropertyBar
                      value={material.properties.detail}
                      label="Chi tiết"
                    />
                  </div>

                  {/* Colors */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Màu có sẵn:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {material.colors.map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 border border-foreground"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Recommended */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Khuyên dùng cho:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {material.recommended.map((rec) => (
                        <span
                          key={rec}
                          className="text-xs px-2 py-1 bg-secondary border border-foreground"
                        >
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 p-6 border-2 border-foreground bg-secondary">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Cần tư vấn thêm?</h3>
                <p className="text-muted-foreground">
                  Nếu bạn không chắc chắn nên chọn vật liệu nào, hãy liên hệ với
                  đội ngũ kỹ thuật của chúng tôi. Chúng tôi sẽ tư vấn dựa trên
                  yêu cầu cụ thể của dự án bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
