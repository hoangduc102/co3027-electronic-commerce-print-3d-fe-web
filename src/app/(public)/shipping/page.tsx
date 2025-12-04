import { Truck, Clock, Package, Shield, AlertCircle } from "lucide-react";

const shippingMethods = [
  {
    name: "Giao hàng tiêu chuẩn",
    time: "3-5 ngày",
    price: "Từ 25.000đ",
    description: "Giao qua Giao Hàng Nhanh, Giao Hàng Tiết Kiệm",
  },
  {
    name: "Giao hàng nhanh",
    time: "1-2 ngày",
    price: "Từ 40.000đ",
    description: "Giao qua J&T Express, Ninja Van",
  },
  {
    name: "Giao hỏa tốc (Nội thành HCM)",
    time: "2-4 giờ",
    price: "Từ 50.000đ",
    description: "Giao qua Ahamove, Grab Express",
  },
];

const zones = [
  { zone: "Nội thành TP.HCM", standard: "25.000đ", express: "40.000đ" },
  { zone: "Ngoại thành TP.HCM", standard: "30.000đ", express: "50.000đ" },
  { zone: "Miền Nam (khác)", standard: "35.000đ", express: "55.000đ" },
  { zone: "Miền Trung", standard: "40.000đ", express: "65.000đ" },
  { zone: "Miền Bắc", standard: "45.000đ", express: "70.000đ" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-16 h-16 bg-primary mx-auto mb-4 flex items-center justify-center">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Chính sách Vận chuyển
            </h1>
            <p className="text-muted-foreground text-lg">
              Giao hàng toàn quốc, đóng gói cẩn thận, bảo đảm sản phẩm nguyên
              vẹn
            </p>
          </div>

          {/* Shipping Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {shippingMethods.map((method) => (
              <div key={method.name} className="border-2 border-foreground p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                  <h3 className="font-bold text-lg">{method.name}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{method.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-primary">
                      {method.price}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Bảng giá vận chuyển</h2>
            <div className="border-2 border-foreground overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 border-b-2 border-foreground">
                      Khu vực
                    </th>
                    <th className="text-center p-4 border-b-2 border-l-2 border-foreground">
                      Tiêu chuẩn
                    </th>
                    <th className="text-center p-4 border-b-2 border-l-2 border-foreground">
                      Nhanh
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((zone, idx) => (
                    <tr
                      key={zone.zone}
                      className={idx % 2 === 0 ? "bg-card" : "bg-secondary/50"}
                    >
                      <td className="p-4 border-b border-foreground/20">
                        {zone.zone}
                      </td>
                      <td className="p-4 border-b border-l-2 border-foreground/20 text-center">
                        {zone.standard}
                      </td>
                      <td className="p-4 border-b border-l-2 border-foreground/20 text-center">
                        {zone.express}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              * Giá trên áp dụng cho đơn hàng dưới 2kg. Đơn nặng hơn sẽ tính
              thêm phí.
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border-2 border-foreground p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Đóng gói sản phẩm
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Bọc foam/bubble wrap bảo vệ từng sản phẩm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Hộp carton cứng chống va đập</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>
                    Giữ nguyên support nếu khách yêu cầu (vận chuyển an toàn
                    hơn)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Tem &quot;Fragile - Hàng dễ vỡ&quot; bên ngoài</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-foreground p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Bảo hiểm vận chuyển
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Miễn phí bảo hiểm cho đơn từ 500.000đ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Đền bù 100% nếu hư hại do vận chuyển</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Quay video đóng gói để đối chứng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                  <span>Liên hệ ngay khi nhận hàng bị hư</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="border-2 border-foreground bg-secondary p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Lưu ý quan trọng
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Vui lòng kiểm tra kỹ sản phẩm trước khi ký nhận.</li>
              <li>Quay video khi mở hộp để làm bằng chứng nếu có sự cố.</li>
              <li>Thông báo ngay trong vòng 24 giờ nếu sản phẩm bị hư hại.</li>
              <li>
                Giữ lại hộp và vật liệu đóng gói cho đến khi xác nhận sản phẩm
                OK.
              </li>
              <li>
                Đơn COD: Kiểm tra hàng trước khi thanh toán (áp dụng tại một số
                khu vực).
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
