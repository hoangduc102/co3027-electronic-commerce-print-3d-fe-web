const USERNAME_PATTERN = /^\w+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

/** Trả về thông báo lỗi, hoặc null nếu hợp lệ */
export function validateProfileUpdate(username: string, email: string) {
  if (!username && !email)
    return "Vui lòng nhập ít nhất một trường để cập nhật";
  if (username && (username.length < 3 || username.length > 50)) {
    return "Username phải có từ 3-50 ký tự";
  }
  if (username && !USERNAME_PATTERN.test(username)) {
    return "Username chỉ chứa chữ cái, số và dấu gạch dưới";
  }
  if (email && !EMAIL_PATTERN.test(email)) return "Email không hợp lệ";
  return null;
}

export function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  if (!currentPassword || !newPassword || !confirmPassword) {
    return "Vui lòng điền đầy đủ các trường";
  }
  if (newPassword.length < 8) return "Mật khẩu mới phải có ít nhất 8 ký tự";
  if (!STRONG_PASSWORD_PATTERN.test(newPassword)) {
    return "Mật khẩu mới phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&)";
  }
  if (newPassword !== confirmPassword) {
    return "Mật khẩu mới và xác nhận không khớp";
  }
  if (currentPassword === newPassword) {
    return "Mật khẩu mới phải khác mật khẩu hiện tại";
  }
  return null;
}
