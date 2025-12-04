"use client";

import {
  Shield,
  RefreshCw,
  Truck,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function WarrantyInfo() {
  return (
    <div className="border-2 border-foreground">
      <div className="p-4 bg-secondary border-b-2 border-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-bold">Bảo hành & Chính sách</h3>
        </div>
      </div>
      <div className="p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="warranty" className="border-foreground">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>Bảo hành sản phẩm</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Bảo hành 7 ngày cho lỗi do sản xuất (gãy, vỡ, sai kích
                    thước)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Không bảo hành hư hỏng do tác động ngoại lực hoặc sử dụng
                    sai cách
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Liên hệ hotline trong vòng 24h kể từ khi nhận hàng nếu phát
                    hiện lỗi
                  </span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="return" className="border-foreground">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-600" />
                <span>Đổi trả hàng</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Đổi trả miễn phí trong 7 ngày nếu sản phẩm bị lỗi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Hoàn tiền 100% hoặc in lại miễn phí theo yêu cầu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Sản phẩm in theo yêu cầu cá nhân không áp dụng đổi trả vì lý
                    do chủ quan
                  </span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping" className="border-foreground">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-600" />
                <span>Vận chuyển</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Giao hàng toàn quốc trong 2-5 ngày làm việc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Đóng gói cẩn thận, chống sốc cho sản phẩm dễ vỡ</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="disclaimer"
            className="border-foreground border-b-0"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-600" />
                <span>Lưu ý quan trọng</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-amber-800">
                    <p>
                      • Màu sắc thực tế có thể chênh lệch nhẹ so với hình ảnh do
                      màn hình.
                    </p>
                    <p>
                      • Sản phẩm in FDM sẽ có các đường vân layer (layer lines)
                      đặc trưng.
                    </p>
                    <p>
                      • Kích thước có thể sai lệch ±0.5mm tùy thuộc vật liệu và
                      thiết kế.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

// Component compact cho checkout page
export function WarrantyBadges() {
  const badges = [
    { icon: Shield, text: "Bảo hành 7 ngày" },
    { icon: RefreshCw, text: "Đổi trả miễn phí" },
    { icon: Truck, text: "Giao 2-5 ngày" },
    { icon: Clock, text: "Hỗ trợ 24/7" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {badges.map((badge) => (
        <div
          key={badge.text}
          className="flex items-center gap-2 p-2 bg-secondary border border-foreground/20 rounded"
        >
          <badge.icon className="h-4 w-4 text-primary shrink-0" />
          <span className="text-xs font-medium">{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
