import { tokenStorage } from "./tokenStorage";
import { authService } from "../services/auth.service";

// Callback khi refresh token thất bại (sẽ được set từ AuthContext)
type OnRefreshFailedCallback = () => void;
let onRefreshFailed: OnRefreshFailedCallback | null = null;

/**
 * Set callback khi refresh token thất bại
 */
export function setOnRefreshFailed(callback: OnRefreshFailedCallback): void {
  onRefreshFailed = callback;
}

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
export function isTokenExpiringSoon(
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
 * Kiểm tra xem token đã hết hạn chưa
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  const decoded = decodeJWT(token);
  if (!decoded?.exp) return true;

  const expirationTime = decoded.exp * 1000;
  return Date.now() >= expirationTime;
}

/**
 * Proactive token refresh service
 * Tự động refresh token trước khi hết hạn
 */
class TokenRefreshService {
  private refreshInterval: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 60 * 1000; // Kiểm tra mỗi 1 phút
  private readonly THRESHOLD_SECONDS = 5 * 60; // Refresh nếu còn < 5 phút (access token có 15 phút)

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
        // Nếu refresh thất bại, xóa tokens và thông báo logout
        this.stop();
        tokenStorage.clear();

        // Gọi callback để thông báo cho AuthContext
        if (onRefreshFailed) {
          onRefreshFailed();
        }
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

    try {
      const tokens = await authService.refresh(refreshToken);
      tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
    } catch (error) {
      // Xóa tokens và thông báo logout khi refresh thất bại
      this.stop();
      tokenStorage.clear();

      if (onRefreshFailed) {
        onRefreshFailed();
      }

      throw error;
    }
  }
}

export const tokenRefreshService = new TokenRefreshService();
