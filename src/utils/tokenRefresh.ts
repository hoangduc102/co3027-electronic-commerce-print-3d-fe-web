import { tokenStorage } from "./tokenStorage";
import { authService } from "../services/auth.service";

/**
 * Decode JWT token để lấy payload (không verify signature).
 * JWT dùng base64url nên cần đổi về base64 chuẩn trước khi atob.
 */
function decodeJWT(token: string): { exp?: number; iat?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/** Token đã hết hạn hoặc sẽ hết hạn trong vòng `thresholdSeconds`. */
export function isTokenExpiringSoon(
  token: string | null,
  thresholdSeconds = 60
): boolean {
  if (!token) return true;
  const exp = decodeJWT(token)?.exp;
  if (!exp) return true;
  return exp * 1000 - Date.now() < thresholdSeconds * 1000;
}

/**
 * Tự động refresh access token trước khi hết hạn.
 */
class TokenRefreshService {
  private refreshInterval: ReturnType<typeof setInterval> | null = null;
  private readonly CHECK_INTERVAL = 60 * 1000; // 1 phút
  private readonly THRESHOLD_SECONDS = 5 * 60; // refresh nếu còn < 5 phút

  start(): void {
    // Tránh tạo nhiều interval khi start() bị gọi nhiều lần
    this.stop();
    void this.checkAndRefresh();
    this.refreshInterval = setInterval(
      () => void this.checkAndRefresh(),
      this.CHECK_INTERVAL
    );
  }

  stop(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private async checkAndRefresh(): Promise<void> {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken || !tokenStorage.getRefreshToken()) {
      this.stop();
      return;
    }

    if (isTokenExpiringSoon(accessToken, this.THRESHOLD_SECONDS)) {
      try {
        await authService.refreshTokens();
      } catch (error) {
        console.error("Lỗi khi refresh token:", error);
        this.stop();
      }
    }
  }
}

export const tokenRefreshService = new TokenRefreshService();
