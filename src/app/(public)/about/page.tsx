import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Award,
  Printer,
  Clock,
  Target,
  Heart,
  Zap,
  Shield,
} from "lucide-react";

const stats = [
  { label: "Đơn hàng hoàn thành", value: "10,000+", icon: Printer },
  { label: "Khách hàng tin tưởng", value: "2,500+", icon: Users },
  { label: "Năm kinh nghiệm", value: "5+", icon: Award },
  { label: "Thời gian in trung bình", value: "3 ngày", icon: Clock },
];

const values = [
  {
    icon: Target,
    title: "Chính xác",
    description:
      "Cam kết độ chính xác cao trong từng chi tiết, đáp ứng yêu cầu kỹ thuật khắt khe nhất.",
  },
  {
    icon: Zap,
    title: "Nhanh chóng",
    description:
      "Quy trình tối ưu, từ báo giá đến giao hàng trong thời gian ngắn nhất.",
  },
  {
    icon: Heart,
    title: "Tận tâm",
    description:
      "Đội ngũ kỹ thuật viên nhiệt huyết, luôn sẵn sàng tư vấn và hỗ trợ khách hàng.",
  },
  {
    icon: Shield,
    title: "Uy tín",
    description:
      "Bảo hành sản phẩm, đổi trả miễn phí nếu lỗi từ phía sản xuất.",
  },
];

const team = [
  {
    name: "Nguyễn Văn A",
    role: "Founder & CEO",
    bio: "10 năm kinh nghiệm trong ngành sản xuất và công nghệ in 3D.",
  },
  {
    name: "Trần Thị B",
    role: "Technical Lead",
    bio: "Chuyên gia về vật liệu in 3D và tối ưu quy trình sản xuất.",
  },
  {
    name: "Lê Văn C",
    role: "Design Engineer",
    bio: "Hỗ trợ khách hàng tối ưu thiết kế file 3D cho sản xuất.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Biến ý tưởng thành
                <br />
                <span className="text-primary">sản phẩm thực</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Print3D.vn là nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt
                Nam. Chúng tôi mang công nghệ sản xuất tiên tiến đến gần hơn với
                mọi người, từ các nhà thiết kế, kỹ sư đến những người đam mê
                sáng tạo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 border-2 border-foreground font-semibold"
                >
                  <Link href="/quote">Bắt đầu dự án</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-foreground bg-transparent"
                >
                  <Link href="/contact">Liên hệ tư vấn</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-secondary border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Câu chuyện của chúng tôi
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Print3D.vn được thành lập năm 2019 bởi một nhóm kỹ sư và
                    designer đam mê công nghệ in 3D. Xuất phát từ một xưởng nhỏ
                    với 2 chiếc máy in FDM, chúng tôi đã không ngừng phát triển
                    để trở thành một trong những đơn vị cung cấp dịch vụ in 3D
                    uy tín nhất tại Việt Nam.
                  </p>
                  <p>
                    Với hơn 10,000 đơn hàng đã hoàn thành, chúng tôi tự hào đã
                    đồng hành cùng các startup, doanh nghiệp sản xuất, và những
                    cá nhân sáng tạo trong việc hiện thực hóa ý tưởng của họ.
                  </p>
                  <p>
                    Hôm nay, Print3D.vn sở hữu hệ thống máy in đa dạng từ FDM,
                    SLA đến SLS, có khả năng đáp ứng mọi nhu cầu từ prototype
                    nhanh đến sản xuất số lượng lớn.
                  </p>
                </div>
              </div>
              <div className="border-2 border-foreground bg-muted aspect-video flex items-center justify-center">
                <div className="text-center text-muted-foreground p-8">
                  <Printer className="h-16 w-16 mx-auto mb-4" />
                  <p>Hình ảnh xưởng sản xuất</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Giá trị cốt lõi
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="border-2 border-foreground bg-card p-6"
                >
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 border-b-2 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Đội ngũ của chúng tôi
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="border-2 border-foreground p-6 text-center"
                >
                  <div className="w-24 h-24 bg-muted border-2 border-foreground mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu dự án?</h2>
            <p className="text-background/80 mb-8 max-w-xl mx-auto">
              Upload file thiết kế của bạn và nhận báo giá ngay lập tức. Đội ngũ
              kỹ thuật sẵn sàng hỗ trợ bạn 24/7.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary font-semibold"
            >
              <Link href="/quote">Upload file ngay</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
