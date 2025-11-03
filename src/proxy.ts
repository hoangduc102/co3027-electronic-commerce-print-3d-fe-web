import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy để redirect các protected routes
// Lưu ý: Token được lưu trong localStorage (client-side)
// Nên bảo vệ thực sự được xử lý bởi ProtectedRoute component
// Proxy này chỉ để redirect ban đầu nếu cần
export function proxy(_request: NextRequest) {
  // ProtectedRoute component sẽ xử lý việc kiểm tra authentication
  // Proxy có thể để trống hoặc thêm logic khác nếu cần
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
