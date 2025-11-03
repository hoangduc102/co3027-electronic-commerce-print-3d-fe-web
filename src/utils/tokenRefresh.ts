import { tokenStorage } from "./tokenStorage";
import { authService } from "../services/auth.service";

/**
 * Decode JWT token để lấy thông tin payload (không verify signature)
 */
function decodeJWT(token: string): { exp?: number; iat?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Kiểm tra xem token có sắp hết hạn không (trong vòng thresholdSeconds)
 */
function isTokenExpiringSoon(
  token: string | null,
  thresholdSeconds: number = 60 // Mặc định: refresh nếu còn < 1 phút
): boolean {
  if (!token) return true;

  const decoded = decodeJWT(token);
  if (!decoded?.exp) return true;

  const expirationTime = decoded.exp * 1000; // Convert to milliseconds
  const now = Date.now();
  const timeUntilExpiry = expirationTime - now;

  return timeUntilExpiry < thresholdSeconds * 1000;
}

/**
 * Proactive token refresh service
 * Tự động refresh token trước khi hết hạn
 */
class TokenRefreshService {
  private refreshInterval: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 5 * 60 * 1000; // Kiểm tra mỗi 5 phút
  private readonly THRESHOLD_SECONDS = 60; // Refresh nếu còn < 1 phút

  /**
   * Bắt đầu tự động refresh token
   */
  start(): void {
    // Kiểm tra ngay lập tức
    this.checkAndRefresh();

    // Sau đó kiểm tra định kỳ
    this.refreshInterval = setInterval(() => {
      this.checkAndRefresh();
    }, this.CHECK_INTERVAL);
  }

  /**
   * Dừng tự động refresh token
   */
  stop(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  /**
   * Kiểm tra và refresh token nếu cần
   */
  private async checkAndRefresh(): Promise<void> {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    // Nếu không có token, dừng service
    if (!accessToken || !refreshToken) {
      this.stop();
      return;
    }

    // Kiểm tra xem token có sắp hết hạn không
    if (isTokenExpiringSoon(accessToken, this.THRESHOLD_SECONDS)) {
      try {
        const tokens = await authService.refresh(refreshToken);
        tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
      } catch (error) {
        console.error("Lỗi khi refresh token:", error);
        // Nếu refresh thất bại, dừng service
        this.stop();
      }
    }
  }

  /**
   * Refresh token ngay lập tức
   */
  async refreshNow(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error("Không có refresh token");
    }

    const tokens = await authService.refresh(refreshToken);
    tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
  }
}

export const tokenRefreshService = new TokenRefreshService();
