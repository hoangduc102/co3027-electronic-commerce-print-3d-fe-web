export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Chính sách Hoàn tiền & Đổi trả
            </h1>

            <div className="prose prose-neutral max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Điều kiện đổi trả</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Print3D.vn cam kết đổi trả miễn phí trong các trường hợp lỗi
                  từ phía sản xuất:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Sản phẩm bị hư hỏng, nứt vỡ trong quá trình in.</li>
                  <li>Kích thước sai lệch quá 5% so với file gốc.</li>
                  <li>In sai màu, sai vật liệu so với đơn đặt hàng.</li>
                  <li>
                    Chất lượng in kém: bị stringing quá nhiều, warping nghiêm
                    trọng.
                  </li>
                  <li>Sản phẩm bị hư hại do đóng gói không đúng cách.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  2. Trường hợp KHÔNG được đổi trả
                </h2>
                <div className="border-2 border-foreground bg-secondary p-4 mb-4">
                  <p className="font-semibold text-foreground">
                    Sản phẩm in theo yêu cầu (custom print) không được đổi trả
                    nếu đã in đúng theo file và thông số kỹ thuật mà khách hàng
                    cung cấp.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>File thiết kế có lỗi (không phải lỗi của Print3D.vn).</li>
                  <li>Khách hàng chọn sai vật liệu hoặc màu sắc.</li>
                  <li>
                    Đường vân layer (layer lines) - đây là đặc điểm của công
                    nghệ FDM.
                  </li>
                  <li>
                    Sản phẩm bị hư hại do vận chuyển (liên hệ đơn vị vận
                    chuyển).
                  </li>
                  <li>Đã quá 7 ngày kể từ ngày nhận hàng.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Quy trình đổi trả</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 border-2 border-foreground">
                    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Liên hệ hỗ trợ</h4>
                      <p className="text-sm text-muted-foreground">
                        Gửi email đến support@print3d.vn hoặc gọi hotline 1900
                        xxxx trong vòng 7 ngày.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 border-2 border-foreground">
                    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Cung cấp thông tin</h4>
                      <p className="text-sm text-muted-foreground">
                        Gửi mã đơn hàng, ảnh/video sản phẩm bị lỗi, mô tả chi
                        tiết vấn đề.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 border-2 border-foreground">
                    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Xác nhận & xử lý</h4>
                      <p className="text-sm text-muted-foreground">
                        Đội ngũ kỹ thuật xác nhận trong 24 giờ. Nếu đủ điều
                        kiện, chọn in lại hoặc hoàn tiền.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 border-2 border-foreground">
                    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Hoàn tất</h4>
                      <p className="text-sm text-muted-foreground">
                        In lại miễn phí hoặc hoàn tiền trong 3-5 ngày làm việc.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  4. Hình thức hoàn tiền
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>100%:</strong> Sản phẩm không thể sử dụng được, lỗi
                    hoàn toàn từ sản xuất.
                  </li>
                  <li>
                    <strong>50%:</strong> Sản phẩm có thể sử dụng nhưng có
                    khuyết điểm nhỏ.
                  </li>
                  <li>
                    <strong>In lại miễn phí:</strong> Thay thế sản phẩm mới,
                    giao hàng miễn phí.
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Hoàn tiền qua: Chuyển khoản ngân hàng, ví MoMo/ZaloPay, hoặc
                  tích điểm cho đơn sau.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Hủy đơn hàng</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Hủy trước khi in: Hoàn 100% (trừ phí thanh toán nếu có).
                  </li>
                  <li>
                    Hủy khi đang in: Không hoàn tiền (vật liệu đã sử dụng).
                  </li>
                  <li>Liên hệ ngay khi cần hủy để tránh mất phí.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Liên hệ</h2>
                <p className="text-muted-foreground">
                  Mọi yêu cầu đổi trả, vui lòng liên hệ:
                </p>
                <ul className="list-none space-y-1 text-muted-foreground mt-2">
                  <li>Email: support@print3d.vn</li>
                  <li>Hotline: 1900 xxxx</li>
                  <li>Zalo: 0901 234 567</li>
                </ul>
              </section>

              <p className="text-sm text-muted-foreground border-t-2 border-foreground pt-6">
                Cập nhật lần cuối: Tháng 12, 2024
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
