import { API_CONFIG, AUTH_ENDPOINTS } from "../config/api.config";
import { User, tokenStorage } from "../utils/tokenStorage";

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  emailOrUsername: string;
  password: string;
}

/**
 * Backend (TransformInterceptor) bọc mọi response thành
 * `{ data, timestamp, path }`. Hàm này bóc lớp `data` ra.
 */
export function unwrapData<T>(json: unknown): T {
  if (json && typeof json === "object" && "data" in json) {
    return (json as { data: T }).data;
  }
  return json as T;
}

/** Lấy message lỗi từ response của NestJS (string hoặc string[]). */
export async function readErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  const body = await response.json().catch(() => null);
  const message = body?.message;
  if (Array.isArray(message)) return message.join(", ");
  if (typeof message === "string" && message) return message;
  return fallback;
}

async function parseResponse<T>(
  response: Response,
  fallbackError: string
): Promise<T> {
  if (!response.ok) {
    throw new Error(await readErrorMessage(response, fallbackError));
  }
  return unwrapData<T>(await response.json());
}

class AuthService {
  private readonly baseUrl = API_CONFIG.API_BASE_URL;
  /** Promise refresh đang chạy — dùng chung để tránh gọi refresh song song. */
  private refreshPromise: Promise<TokenResponse> | null = null;
  /** Được AuthContext đăng ký để biết khi phiên đăng nhập hết hạn. */
  private sessionExpiredHandler: (() => void) | null = null;

  onSessionExpired(handler: (() => void) | null): void {
    this.sessionExpiredHandler = handler;
  }

  private post(endpoint: string, body?: unknown, accessToken?: string) {
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await this.post(AUTH_ENDPOINTS.REGISTER, data);
    return parseResponse<AuthResponse>(response, "Đăng ký thất bại");
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await this.post(AUTH_ENDPOINTS.LOGIN, data);
    const result = await parseResponse<AuthResponse>(
      response,
      "Đăng nhập thất bại"
    );

    if (!result?.accessToken || !result?.refreshToken || !result?.user) {
      throw new Error("Phản hồi đăng nhập từ server không hợp lệ");
    }
    return result;
  }

  async refresh(refreshToken: string): Promise<TokenResponse> {
    const response = await this.post(AUTH_ENDPOINTS.REFRESH, { refreshToken });
    return parseResponse<TokenResponse>(
      response,
      "Token đã hết hạn. Vui lòng đăng nhập lại."
    );
  }

  /**
   * Refresh token dùng refresh token trong storage và lưu token mới.
   * Backend xoay vòng (rotate) refresh token: token cũ bị xoá ngay sau khi dùng,
   * nên mọi nơi trong app PHẢI đi qua hàm này để chỉ có 1 request refresh tại một thời điểm.
   * Nếu thất bại sẽ xoá token và ném lỗi.
   */
  refreshTokens(): Promise<TokenResponse> {
    if (this.refreshPromise) return this.refreshPromise;

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      tokenStorage.clear();
      this.sessionExpiredHandler?.();
      return Promise.reject(new Error("Không có refresh token"));
    }

    this.refreshPromise = this.refresh(refreshToken)
      .then((tokens) => {
        tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        return tokens;
      })
      .catch((error) => {
        tokenStorage.clear();
        this.sessionExpiredHandler?.();
        throw error;
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  async getCurrentUser(accessToken: string): Promise<User> {
    const fetchMe = (token: string) =>
      fetch(`${this.baseUrl}${AUTH_ENDPOINTS.ME}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    let response = await fetchMe(accessToken);

    if (response.status === 401) {
      try {
        const tokens = await this.refreshTokens();
        response = await fetchMe(tokens.accessToken);
      } catch {
        throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
    }

    return parseResponse<User>(response, "Không thể lấy thông tin người dùng");
  }

  async logout(accessToken: string, refreshToken?: string): Promise<void> {
    const response = await this.post(
      AUTH_ENDPOINTS.LOGOUT,
      refreshToken ? { refreshToken } : undefined,
      accessToken
    );
    if (!response.ok) {
      throw new Error(await readErrorMessage(response, "Đăng xuất thất bại"));
    }
  }
}

export const authService = new AuthService();
