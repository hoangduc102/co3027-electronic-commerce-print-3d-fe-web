import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Heart,
  Zap,
  Users,
  Rocket,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Bảo hiểm đầy đủ",
    description: "BHXH, BHYT, khám sức khỏe định kỳ",
  },
  {
    icon: Zap,
    title: "Môi trường sáng tạo",
    description: "Làm việc với công nghệ mới nhất",
  },
  {
    icon: Users,
    title: "Team trẻ",
    description: "Đồng nghiệp nhiệt huyết, năng động",
  },
  {
    icon: Rocket,
    title: "Phát triển",
    description: "Cơ hội học hỏi và thăng tiến",
  },
];

const openPositions = [
  {
    id: "1",
    title: "Kỹ thuật viên In 3D",
    type: "Full-time",
    location: "TP. Hồ Chí Minh",
    department: "Sản xuất",
    description:
      "Vận hành máy in 3D FDM/SLA, xử lý hậu kỳ sản phẩm, kiểm tra chất lượng.",
  },
  {
    id: "2",
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote / HCM",
    department: "Tech",
    description:
      "Phát triển giao diện web với React/Next.js, tối ưu UX cho nền tảng e-commerce.",
  },
  {
    id: "3",
    title: "Customer Support",
    type: "Full-time",
    location: "TP. Hồ Chí Minh",
    department: "Operations",
    description:
      "Hỗ trợ khách hàng qua chat/email, tư vấn dịch vụ in 3D, xử lý khiếu nại.",
  },
  {
    id: "4",
    title: "3D Designer (Part-time)",
    type: "Part-time",
    location: "Remote",
    department: "Design",
    description:
      "Thiết kế mẫu sản phẩm in 3D, hỗ trợ khách hàng tối ưu file, tạo content.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Gia nhập Print3D.vn
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Bạn đam mê công nghệ và sáng tạo? Hãy cùng chúng tôi xây dựng
                tương lai của ngành sản xuất in 3D tại Việt Nam.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 border-2 border-foreground"
              >
                <a href="#positions">Xem vị trí đang tuyển</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-secondary border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Quyền lợi nhân viên
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="border-2 border-foreground bg-card p-6 text-center"
                >
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Vị trí đang tuyển</h2>
            <div className="space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="border-2 border-foreground p-6 hover:bg-secondary transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-lg">{position.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </span>
                        <span className="px-2 py-0.5 bg-secondary border border-foreground text-xs">
                          {position.department}
                        </span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 border-foreground flex-shrink-0 bg-transparent"
                    >
                      <Link
                        href={`mailto:hr@print3d.vn?subject=Ứng tuyển: ${position.title}`}
                      >
                        Ứng tuyển
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Không thấy vị trí phù hợp?
            </h2>
            <p className="text-background/80 mb-6 max-w-xl mx-auto">
              Gửi CV của bạn đến hr@print3d.vn. Chúng tôi luôn tìm kiếm những
              người tài năng và sẽ liên hệ khi có vị trí phù hợp.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary"
            >
              <a href="mailto:hr@print3d.vn">Gửi CV</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
