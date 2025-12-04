export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Điều khoản Dịch vụ
            </h1>

            <div className="prose prose-neutral max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Giới thiệu</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chào mừng bạn đến với Print3D.vn. Bằng việc sử dụng dịch vụ
                  của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện
                  được nêu dưới đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Dịch vụ In 3D</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Chúng tôi cung cấp dịch vụ in 3D theo yêu cầu dựa trên file
                    thiết kế do khách hàng cung cấp.
                  </li>
                  <li>
                    Thời gian sản xuất phụ thuộc vào kích thước, độ phức tạp và
                    số lượng đơn hàng.
                  </li>
                  <li>
                    Chúng tôi có quyền từ chối đơn hàng nếu file không đạt yêu
                    cầu kỹ thuật.
                  </li>
                  <li>
                    Giá báo trên website là giá tham khảo, giá cuối cùng sẽ được
                    xác nhận sau khi kiểm tra file.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  3. Bản quyền và Sở hữu trí tuệ
                </h2>
                <div className="border-2 border-foreground bg-secondary p-4 mb-4">
                  <p className="font-semibold text-foreground">
                    Khách hàng cam kết rằng họ có quyền sở hữu hoặc quyền sử
                    dụng hợp pháp đối với tất cả các file 3D được tải lên hệ
                    thống.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Print3D.vn không chịu trách nhiệm nếu khách hàng vi phạm bản
                    quyền của bên thứ ba.
                  </li>
                  <li>
                    Chúng tôi có quyền xóa và từ chối in các file vi phạm bản
                    quyền.
                  </li>
                  <li>
                    File của khách hàng được bảo mật và không chia sẻ với bên
                    thứ ba.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Thanh toán</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Đơn hàng dưới 500.000đ: Không cần đặt cọc.</li>
                  <li>Đơn hàng từ 500.000đ - 2.000.000đ: Đặt cọc 50%.</li>
                  <li>Đơn hàng trên 2.000.000đ: Đặt cọc 70%.</li>
                  <li>
                    Thanh toán bằng chuyển khoản, thẻ, ví điện tử hoặc COD.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Giao hàng</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Giao hàng toàn quốc qua các đơn vị vận chuyển uy tín.</li>
                  <li>
                    Phí vận chuyển được tính riêng và hiển thị khi thanh toán.
                  </li>
                  <li>
                    Thời gian giao hàng 2-5 ngày tùy khu vực sau khi sản phẩm
                    hoàn thành.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  6. Đổi trả và Hoàn tiền
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Chấp nhận đổi trả trong 7 ngày nếu lỗi từ phía sản xuất.
                  </li>
                  <li>
                    Không đổi trả với sản phẩm in theo yêu cầu nếu đúng theo
                    file khách hàng cung cấp.
                  </li>
                  <li>
                    Hoàn tiền 100% nếu sản phẩm bị lỗi không thể sửa chữa.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  7. Giới hạn trách nhiệm
                </h2>
                <div className="border-2 border-foreground bg-secondary p-4">
                  <p className="text-muted-foreground">
                    In 3D công nghệ FDM sẽ có các đường vân (layer lines) đặc
                    trưng và không mịn hoàn toàn như đúc nhựa. Đây là đặc điểm
                    của công nghệ, không phải lỗi sản xuất. Khách hàng cần hiểu
                    rõ điều này trước khi đặt hàng.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Liên hệ</h2>
                <p className="text-muted-foreground">
                  Nếu có bất kỳ thắc mắc nào về điều khoản dịch vụ, vui lòng
                  liên hệ:
                </p>
                <ul className="list-none space-y-1 text-muted-foreground mt-2">
                  <li>Email: support@print3d.vn</li>
                  <li>Hotline: 1900 xxxx</li>
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
