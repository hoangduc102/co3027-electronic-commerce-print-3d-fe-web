"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Check, X, Info, Download } from "lucide-react";
import Link from "next/link";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Hướng dẫn Thiết kế cho In 3D
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Để đảm bảo file của bạn được in thành công với chất lượng tốt
              nhất, vui lòng tuân thủ các nguyên tắc thiết kế dưới đây.
            </p>
          </div>

          <Tabs defaultValue="wall" className="space-y-8">
            <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent">
              {[
                { value: "wall", label: "Độ dày vách" },
                { value: "overhang", label: "Góc nghiêng & Support" },
                { value: "size", label: "Kích thước máy in" },
                { value: "details", label: "Chi tiết nhỏ" },
                { value: "holes", label: "Lỗ & Khớp nối" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="border-2 border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background px-4 py-2"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Wall Thickness */}
            <TabsContent value="wall" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Độ dày vách tối thiểu
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Vách quá mỏng sẽ không thể in được hoặc dễ vỡ. Độ dày tối
                    thiểu phụ thuộc vào công nghệ in.
                  </p>

                  <div className="space-y-4">
                    <div className="border-2 border-foreground p-4 flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">FDM</span>
                      </div>
                      <div>
                        <p className="font-bold">1.2mm - 2mm</p>
                        <p className="text-sm text-muted-foreground">
                          Tối thiểu 1.2mm, khuyến nghị 2mm cho độ bền
                        </p>
                      </div>
                    </div>
                    <div className="border-2 border-foreground p-4 flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">SLA</span>
                      </div>
                      <div>
                        <p className="font-bold">0.5mm - 1mm</p>
                        <p className="text-sm text-muted-foreground">
                          Có thể in mỏng hơn nhưng dễ gãy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-foreground p-6 bg-card">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Lưu ý quan trọng
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Vách dày đều giúp tránh cong vênh
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Thêm fillet/bo góc tại các điểm nối
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Tránh vách mỏng dưới 0.8mm cho FDM
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Tránh chênh lệch độ dày lớn trong một chi tiết
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Example */}
              <div className="border-2 border-foreground p-6">
                <h3 className="font-bold mb-4">Minh họa</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="aspect-video bg-secondary border-2 border-foreground flex items-center justify-center mb-3">
                      <div className="flex items-end gap-2">
                        <div className="w-8 h-24 bg-red-400 border-2 border-foreground" />
                        <span className="text-xs text-muted-foreground mb-2">
                          0.5mm
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-red-500 font-medium flex items-center justify-center gap-1">
                      <X className="h-4 w-4" /> Quá mỏng - Dễ vỡ
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-video bg-secondary border-2 border-foreground flex items-center justify-center mb-3">
                      <div className="flex items-end gap-2">
                        <div className="w-12 h-24 bg-green-400 border-2 border-foreground" />
                        <span className="text-xs text-muted-foreground mb-2">
                          2mm
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-1">
                      <Check className="h-4 w-4" /> Độ dày phù hợp
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Overhangs */}
            <TabsContent value="overhang" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Góc nghiêng & Support
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    In 3D FDM xây dựng từ dưới lên. Các phần nhô ra (overhang)
                    quá 45° cần support để đỡ.
                  </p>

                  <div className="border-2 border-foreground p-4 bg-amber-50">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Info className="h-5 w-5 text-amber-600" />
                      Quy tắc 45°
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">
                          {"<"}45°
                        </span>
                        <span>Có thể in không cần support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">
                          45° - 60°
                        </span>
                        <span>Chất lượng bề mặt giảm, có thể cần support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">{">"}60°</span>
                        <span>Bắt buộc cần support</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-2 border-foreground p-6">
                  <h3 className="font-bold mb-4">Minh họa góc nghiêng</h3>
                  <div className="aspect-video bg-secondary flex items-end justify-center gap-8 p-4">
                    <div className="text-center">
                      <div
                        className="w-16 h-20 bg-green-400 border-2 border-foreground"
                        style={{ transform: "skewX(-20deg)" }}
                      />
                      <p className="text-xs mt-2 text-green-600">30°</p>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-16 h-20 bg-amber-400 border-2 border-foreground"
                        style={{ transform: "skewX(-45deg)" }}
                      />
                      <p className="text-xs mt-2 text-amber-600">45°</p>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-16 h-20 bg-red-400 border-2 border-foreground"
                        style={{ transform: "skewX(-60deg)" }}
                      />
                      <p className="text-xs mt-2 text-red-600">60°</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-foreground p-6">
                <h3 className="font-bold mb-4">Các cách tránh support</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary border border-foreground">
                    <h4 className="font-medium mb-2">Chia nhỏ chi tiết</h4>
                    <p className="text-sm text-muted-foreground">
                      In riêng rồi ghép lại để tránh overhang lớn
                    </p>
                  </div>
                  <div className="p-4 bg-secondary border border-foreground">
                    <h4 className="font-medium mb-2">Xoay hướng in</h4>
                    <p className="text-sm text-muted-foreground">
                      Đặt mô hình theo hướng tối ưu để giảm support
                    </p>
                  </div>
                  <div className="p-4 bg-secondary border border-foreground">
                    <h4 className="font-medium mb-2">Thêm chamfer</h4>
                    <p className="text-sm text-muted-foreground">
                      Vát góc 45° thay vì để vuông góc
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Print Size */}
            <TabsContent value="size" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Kích thước máy in</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Mỗi máy in có giới hạn kích thước khác nhau. Mô hình lớn hơn
                    sẽ cần chia nhỏ và ghép.
                  </p>

                  <div className="space-y-4">
                    <div className="border-2 border-foreground p-4">
                      <h4 className="font-bold mb-2">FDM (Phổ biến)</h4>
                      <p className="text-2xl font-bold text-primary mb-1">
                        250 × 250 × 300mm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kích thước phổ biến cho máy FDM tiêu chuẩn
                      </p>
                    </div>
                    <div className="border-2 border-foreground p-4">
                      <h4 className="font-bold mb-2">FDM (Lớn)</h4>
                      <p className="text-2xl font-bold text-primary mb-1">
                        400 × 400 × 450mm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Máy in khổ lớn, phụ phí cho chi tiết lớn
                      </p>
                    </div>
                    <div className="border-2 border-foreground p-4">
                      <h4 className="font-bold mb-2">SLA/Resin</h4>
                      <p className="text-2xl font-bold text-primary mb-1">
                        130 × 80 × 150mm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kích thước nhỏ hơn nhưng chi tiết cao
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-foreground p-6 bg-card">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Mô hình lớn hơn giới hạn?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Chúng tôi có thể chia nhỏ và ghép lại cho bạn. Phí ghép:
                    50.000đ - 200.000đ tùy độ phức tạp.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Chia theo mặt phẳng tối ưu</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Thêm khớp nối (dowel pins) để ghép chính xác</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Dán keo và xử lý mối nối</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Small Details */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Chi tiết nhỏ</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Khả năng in chi tiết nhỏ phụ thuộc vào công nghệ và đường
                    kính đầu phun (nozzle).
                  </p>

                  <div className="space-y-4">
                    <div className="border-2 border-foreground p-4">
                      <h4 className="font-bold mb-2">
                        FDM - Chi tiết tối thiểu
                      </h4>
                      <div className="flex gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Lỗ nhỏ nhất
                          </p>
                          <p className="font-bold">2mm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Chữ nổi
                          </p>
                          <p className="font-bold">Cao 5mm, dày 1mm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rãnh</p>
                          <p className="font-bold">Rộng 1mm</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-foreground p-4">
                      <h4 className="font-bold mb-2">
                        SLA - Chi tiết tối thiểu
                      </h4>
                      <div className="flex gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Lỗ nhỏ nhất
                          </p>
                          <p className="font-bold">0.5mm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Chữ nổi
                          </p>
                          <p className="font-bold">Cao 2mm, dày 0.3mm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rãnh</p>
                          <p className="font-bold">Rộng 0.3mm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-foreground p-6 bg-amber-50">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Chữ & Logo
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Chữ khắc chìm (debossed) dễ in hơn chữ nổi (embossed).
                    Khuyến nghị:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">FDM:</span>
                      <span>Font chữ đậm, cao tối thiểu 8mm cho chữ nổi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">SLA:</span>
                      <span>Có thể in chữ nhỏ 2-3mm với font rõ ràng</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Holes & Joints */}
            <TabsContent value="holes" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Lỗ & Khớp nối</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    In 3D có sai số, đặc biệt ở các lỗ và chi tiết khớp nối. Cần
                    thiết kế dung sai (tolerance) phù hợp.
                  </p>

                  <div className="border-2 border-foreground p-4 mb-4">
                    <h4 className="font-bold mb-3">Quy tắc dung sai</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 flex items-center justify-center font-bold text-sm">
                          +0.2
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Lỗ tròn</p>
                          <p className="text-muted-foreground">
                            Thiết kế to hơn 0.2-0.3mm
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 flex items-center justify-center font-bold text-sm">
                          -0.2
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Trục tròn</p>
                          <p className="text-muted-foreground">
                            Thiết kế nhỏ hơn 0.2mm
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 flex items-center justify-center font-bold text-sm">
                          0.4
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Khe hở (Clearance)</p>
                          <p className="text-muted-foreground">
                            Tối thiểu 0.4mm cho chi tiết trượt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-foreground p-6">
                  <h3 className="font-bold mb-4">Các loại khớp nối phổ biến</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-secondary border border-foreground">
                      <h4 className="font-medium">Snap-fit (Khớp bấm)</h4>
                      <p className="text-sm text-muted-foreground">
                        Dùng TPU hoặc PETG. Thiết kế góc vát để dễ bấm vào.
                      </p>
                    </div>
                    <div className="p-3 bg-secondary border border-foreground">
                      <h4 className="font-medium">Press-fit (Khớp ép)</h4>
                      <p className="text-sm text-muted-foreground">
                        Lỗ nhỏ hơn trục 0.1-0.15mm. Ép chặt, không cần keo.
                      </p>
                    </div>
                    <div className="p-3 bg-secondary border border-foreground">
                      <h4 className="font-medium">Ren vít</h4>
                      <p className="text-sm text-muted-foreground">
                        Dùng heat-set inserts (đệm nhiệt) cho ren chắc chắn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Download Section */}
          <div className="mt-12 p-8 border-2 border-foreground bg-secondary">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Tải về PDF hướng dẫn đầy đủ
                </h2>
                <p className="text-muted-foreground">
                  Bao gồm checklist kiểm tra file trước khi gửi in
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground gap-2">
                <Download className="h-4 w-4" />
                Tải PDF (2.5MB)
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Đã sẵn sàng với file thiết kế?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground"
            >
              <Link href="/quote">Báo giá ngay</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
