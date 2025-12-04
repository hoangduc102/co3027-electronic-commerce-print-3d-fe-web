import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Upload,
  ShoppingBag,
  ArrowRight,
  Box,
  Zap,
  Shield,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Báo giá tức thì",
    description:
      "Upload file và nhận báo giá ngay lập tức với công cụ tính giá tự động.",
  },
  {
    icon: Box,
    title: "Đa dạng vật liệu",
    description: "PLA, PETG, ABS, TPU, Resin và nhiều loại nhựa in khác.",
  },
  {
    icon: Shield,
    title: "Chất lượng đảm bảo",
    description: "Kiểm tra kỹ thuật từng file và cam kết chất lượng sản phẩm.",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Đóng gói cẩn thận và giao hàng toàn quốc trong 1-3 ngày.",
  },
];

const materials = [
  { name: "PLA", color: "bg-emerald-500", description: "Rẻ, dễ in" },
  { name: "PETG", color: "bg-blue-500", description: "Bền, chịu nước" },
  { name: "ABS", color: "bg-amber-500", description: "Chịu nhiệt" },
  { name: "TPU", color: "bg-pink-500", description: "Dẻo, đàn hồi" },
  { name: "Resin", color: "bg-violet-500", description: "Siêu mịn" },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Biến ý tưởng 3D thành hiện thực
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Nền tảng dịch vụ in 3D chuyên nghiệp. Báo giá tức thì, đa dạng
              công nghệ và vật liệu, giao hàng nhanh chóng toàn quốc.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold gap-2 text-base h-14 px-8"
              >
                <Link href="/quote">
                  <Upload className="h-5 w-5" />
                  Tôi có file - Báo giá ngay
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-foreground font-semibold gap-2 text-base h-14 px-8 bg-background hover:bg-secondary"
              >
                <Link href="/store">
                  <ShoppingBag className="h-5 w-5" />
                  Mua mẫu có sẵn
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Strip */}
      <section className="border-y-2 border-foreground py-6 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Vật liệu:
            </span>
            {materials.map((material) => (
              <div key={material.name} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 ${material.color} border border-foreground`}
                />
                <span className="font-medium">{material.name}</span>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  • {material.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại sao chọn Print3D.vn?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quy trình chuyên nghiệp, công nghệ hiện đại và đội ngũ kỹ thuật
              giàu kinh nghiệm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border-2 border-foreground p-6 bg-card hover:bg-secondary transition-colors"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quy trình đơn giản
            </h2>
            <p className="text-background/70 max-w-2xl mx-auto">
              Chỉ 4 bước để nhận sản phẩm in 3D của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Upload File",
                description: "Tải lên file STL, OBJ, STEP hoặc 3MF",
              },
              {
                step: "02",
                title: "Chọn thông số",
                description: "Vật liệu, màu sắc, độ phân giải",
              },
              {
                step: "03",
                title: "Thanh toán",
                description: "Xác nhận đơn hàng và thanh toán",
              },
              {
                step: "04",
                title: "Nhận hàng",
                description: "Giao hàng tận nơi trong 3-5 ngày",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="border-2 border-background/30 p-6">
                  <span className="text-5xl font-bold text-primary mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-background/70 text-sm">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 text-primary h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="border-2 border-foreground p-8 md:p-12 lg:p-16 text-center bg-secondary">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Upload file ngay để nhận báo giá tức thì. Không cần đăng ký, không
              cần chờ đợi.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold gap-2 text-base h-14 px-8"
            >
              <Link href="/quote">
                <Upload className="h-5 w-5" />
                Báo giá ngay
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
