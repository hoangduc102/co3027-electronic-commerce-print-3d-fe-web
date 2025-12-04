export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Chính sách Bảo mật
            </h1>

            <div className="prose prose-neutral max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">
                  1. Thu thập thông tin
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chúng tôi thu thập các thông tin sau khi bạn sử dụng dịch vụ:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ
                    giao hàng.
                  </li>
                  <li>
                    Thông tin thanh toán: Được xử lý bảo mật qua cổng thanh
                    toán.
                  </li>
                  <li>
                    File 3D: Lưu trữ tạm thời để sản xuất và hỗ trợ khách hàng.
                  </li>
                  <li>
                    Dữ liệu sử dụng: Cookies, lịch sử truy cập để cải thiện trải
                    nghiệm.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Sử dụng thông tin</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Xử lý và giao đơn hàng.</li>
                  <li>Liên hệ hỗ trợ kỹ thuật và chăm sóc khách hàng.</li>
                  <li>
                    Gửi thông báo về đơn hàng và chương trình khuyến mãi (nếu
                    đồng ý).
                  </li>
                  <li>Cải thiện sản phẩm và dịch vụ.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Bảo mật File 3D</h2>
                <div className="border-2 border-foreground bg-secondary p-4 mb-4">
                  <p className="font-semibold text-foreground">
                    File 3D của bạn được bảo mật tuyệt đối và không bao giờ được
                    chia sẻ với bên thứ ba hoặc sử dụng cho mục đích khác ngoài
                    việc sản xuất đơn hàng của bạn.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>File được mã hóa khi lưu trữ.</li>
                  <li>Chỉ nhân viên được ủy quyền mới có quyền truy cập.</li>
                  <li>File có thể được xóa theo yêu cầu của khách hàng.</li>
                  <li>
                    File tự động xóa sau 30 ngày kể từ khi đơn hàng hoàn thành.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Chia sẻ thông tin</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn.
                  Thông tin chỉ được chia sẻ trong các trường hợp sau:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Đối tác vận chuyển: Tên, địa chỉ, số điện thoại để giao
                    hàng.
                  </li>
                  <li>Cổng thanh toán: Xử lý giao dịch thanh toán.</li>
                  <li>
                    Yêu cầu pháp lý: Khi có yêu cầu từ cơ quan có thẩm quyền.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Website sử dụng cookies để cải thiện trải nghiệm người dùng.
                  Bạn có thể tắt cookies trong cài đặt trình duyệt, tuy nhiên
                  một số tính năng có thể không hoạt động đúng.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Quyền của bạn</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Yêu cầu truy cập thông tin cá nhân đang được lưu trữ.</li>
                  <li>Yêu cầu chỉnh sửa thông tin không chính xác.</li>
                  <li>Yêu cầu xóa tài khoản và dữ liệu cá nhân.</li>
                  <li>Từ chối nhận email marketing.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Liên hệ</h2>
                <p className="text-muted-foreground">
                  Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:
                </p>
                <ul className="list-none space-y-1 text-muted-foreground mt-2">
                  <li>Email: privacy@print3d.vn</li>
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
