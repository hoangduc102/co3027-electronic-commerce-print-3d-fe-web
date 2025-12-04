import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  services: [
    { name: "Dịch vụ In 3D", href: "/quote" },
    { name: "Cửa hàng Mẫu", href: "/store" },
    { name: "Thư viện vật liệu", href: "/materials" },
    { name: "Hướng dẫn thiết kế", href: "/guidelines" },
  ],
  resources: [
    { name: "Trung tâm hỗ trợ", href: "/support" },
    { name: "Showcase", href: "/showcase" },
    { name: "Blog", href: "/blog" },
    { name: "Tìm kiếm", href: "/search" },
  ],
  company: [
    { name: "Về chúng tôi", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
    { name: "Đối tác", href: "/partners" },
    { name: "Tuyển dụng", href: "/careers" },
  ],
  legal: [
    { name: "Điều khoản sử dụng", href: "/terms" },
    { name: "Chính sách bảo mật", href: "/privacy" },
    { name: "Chính sách hoàn tiền", href: "/refund" },
    { name: "Vận chuyển", href: "/shipping" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
              Tài nguyên
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
              Công ty
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">
              Pháp lý
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-2">Liên hệ</h4>
              <p className="text-sm text-background/70">Hotline: 1900 xxxx</p>
              <p className="text-sm text-background/70">
                Email: support@print3d.vn
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Địa chỉ</h4>
              <p className="text-sm text-background/70">
                123 Nguyễn Văn Linh, Quận 7
              </p>
              <p className="text-sm text-background/70">TP. Hồ Chí Minh</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Giờ làm việc</h4>
              <p className="text-sm text-background/70">
                T2 - T6: 8:00 - 18:00
              </p>
              <p className="text-sm text-background/70">T7: 8:00 - 12:00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Thông tin doanh nghiệp</h4>
              <p className="text-sm text-background/70">
                Công ty TNHH Print3D Việt Nam
              </p>
              <p className="text-sm text-background/70">MST: 0123456789</p>
              <p className="text-sm text-background/70">GPĐKKD: 41/GP-BTTTT</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-3 py-4 mb-4 border-t border-b border-background/20">
            <span className="text-sm text-background/70 mr-2">Thanh toán:</span>
            {["Visa", "MasterCard", "MoMo", "ZaloPay", "VNPAY", "COD"].map(
              (method) => (
                <span
                  key={method}
                  className="text-xs px-2 py-1 bg-background/10 rounded"
                >
                  {method}
                </span>
              )
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Print3D.vn Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold">Print3D.vn</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-background/70">
              <span>© {new Date().getFullYear()} Print3D.vn</span>
              <span>•</span>
              <span>Đã đăng ký Bộ Công Thương</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
