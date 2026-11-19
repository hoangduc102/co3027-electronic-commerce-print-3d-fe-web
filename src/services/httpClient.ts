import { API_CONFIG } from "../config/api.config";
import { tokenStorage } from "../utils/tokenStorage";
import { authService, readErrorMessage } from "./auth.service";
import { isTokenExpiringSoon } from "../utils/tokenRefresh";

function redirectToLogin() {
  if (globalThis.window !== undefined) {
    globalThis.window.location.href = "/login";
  }
}

class HttpClient {
  private readonly baseUrl = API_CONFIG.API_BASE_URL;

  /**
   * Gọi API backend. Trả về nguyên body JSON (vẫn còn lớp `{ data }`),
   * các service tự lấy `.data` theo kiểu dữ liệu của mình.
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let accessToken = tokenStorage.getAccessToken();

    // Refresh chủ động nếu token đã/sắp hết hạn.
    // Thất bại thì gửi request không kèm token (endpoint public vẫn chạy được).
    if (accessToken && isTokenExpiringSoon(accessToken, 60)) {
      accessToken = await this.tryRefresh(false);
    }

    const send = (token: string | null) => {
      const headers = new Headers(options.headers);
      // Không set Content-Type cho FormData để browser tự thêm boundary
      if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return fetch(url, { ...options, headers });
    };

    let response = await send(accessToken);

    // Token bị từ chối → refresh 1 lần rồi gọi lại
    if (response.status === 401 && accessToken) {
      const newToken = await this.tryRefresh(true);
      if (newToken) response = await send(newToken);
    }

    if (!response.ok) {
      throw new Error(
        await readErrorMessage(
          response,
          `HTTP ${response.status}: ${response.statusText}`
        )
      );
    }

    // 204 No Content hoặc body rỗng
    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }

  /** Refresh token; trả về access token mới hoặc null nếu thất bại. */
  private async tryRefresh(redirectOnFail: boolean): Promise<string | null> {
    try {
      const tokens = await authService.refreshTokens();
      return tokens.accessToken;
    } catch {
      if (redirectOnFail) redirectToLogin();
      return null;
    }
  }

  private withBody(data: unknown): BodyInit | undefined {
    if (data === undefined) return undefined;
    if (data instanceof FormData) return data;
    return JSON.stringify(data);
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: this.withBody(data),
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: this.withBody(data),
    });
  }

  patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: this.withBody(data),
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const httpClient = new HttpClient();
