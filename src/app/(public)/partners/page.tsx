import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Handshake,
  Building,
  Users,
  TrendingUp,
  CheckCircle,
  Mail,
} from "lucide-react";

const partnerTypes = [
  {
    icon: Building,
    title: "Đối tác Doanh nghiệp",
    description: "Dành cho công ty cần in 3D số lượng lớn hoặc thường xuyên",
    benefits: [
      "Giảm 15-25% cho đơn hàng từ 5 triệu đồng",
      "Tài khoản riêng với báo giá ưu đãi",
      "Kỹ thuật viên hỗ trợ riêng",
      "Thanh toán linh hoạt (công nợ 30 ngày)",
      "Ưu tiên sản xuất",
    ],
  },
  {
    icon: Users,
    title: "Đối tác Designer",
    description:
      "Dành cho designer, kiến trúc sư, kỹ sư thường xuyên cần prototype",
    benefits: [
      "Giảm 10% cho mọi đơn hàng",
      "Hỗ trợ tối ưu file miễn phí",
      "Tham gia cộng đồng designer 3D",
      "Được giới thiệu trên website",
      "Sample vật liệu mới miễn phí",
    ],
  },
  {
    icon: TrendingUp,
    title: "Đối tác Reseller",
    description: "Dành cho các đơn vị muốn kinh doanh dịch vụ in 3D",
    benefits: [
      "Giá gốc cho reseller",
      "White-label service",
      "API tích hợp hệ thống",
      "Training về in 3D",
      "Marketing support",
    ],
  },
];

const currentPartners = [
  { name: "FPT Software", type: "Doanh nghiệp" },
  { name: "Đại học Bách Khoa", type: "Giáo dục" },
  { name: "Studio ABC Design", type: "Designer" },
  { name: "VinFast R&D", type: "Doanh nghiệp" },
  { name: "Maker Space Saigon", type: "Cộng đồng" },
  { name: "3D Corner Shop", type: "Reseller" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6">
                <Handshake className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Chương trình Đối tác
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Hợp tác cùng Print3D.vn để nhận ưu đãi đặc biệt và hỗ trợ chuyên
                nghiệp cho nhu cầu in 3D của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-16 border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Loại hình đối tác
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerTypes.map((type) => (
                <div
                  key={type.title}
                  className="border-2 border-foreground p-6"
                >
                  <type.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="py-16 bg-secondary border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Đối tác hiện tại
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {currentPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="border-2 border-foreground bg-card p-4 text-center"
                >
                  <div className="w-12 h-12 bg-muted mx-auto mb-3 flex items-center justify-center border border-foreground">
                    <Building className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-semibold text-sm">{partner.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {partner.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Trở thành đối tác</h2>
              <p className="text-muted-foreground mb-8">
                Liên hệ với chúng tôi để tìm hiểu thêm về chương trình đối tác
                và các quyền lợi dành riêng cho bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 border-2 border-foreground"
                >
                  <Link href="/contact?subject=business">
                    <Mail className="h-4 w-4 mr-2" />
                    Liên hệ hợp tác
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-foreground bg-transparent"
                >
                  <a href="mailto:business@print3d.vn">business@print3d.vn</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
