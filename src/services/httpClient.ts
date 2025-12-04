import { API_CONFIG } from "../config/api.config";
import { tokenStorage } from "../utils/tokenStorage";
import { authService } from "./auth.service";
import { isTokenExpiringSoon, isTokenExpired } from "../utils/tokenRefresh";

class HttpClient {
  private readonly baseUrl = API_CONFIG.API_BASE_URL;
  private isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    let accessToken = tokenStorage.getAccessToken();

    // Kiểm tra token trước khi gọi API (trừ endpoint refresh)
    if (accessToken && !endpoint.includes("/auth/")) {
      // Nếu token đã hết hạn hoặc sắp hết hạn, refresh trước
      if (isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken, 60)) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshPromise = this.handleTokenRefresh();
        }
        await this.refreshPromise;
        accessToken = tokenStorage.getAccessToken();
      }
    }

    // Tự động thêm Authorization header nếu có token
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // Nếu token hết hạn (401), thử refresh token
    if (
      response.status === 401 &&
      accessToken &&
      !endpoint.includes("/auth/refresh")
    ) {
      // Chỉ refresh một lần nếu đang refresh
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshPromise = this.handleTokenRefresh();
      }

      await this.refreshPromise;

      // Retry request với token mới
      const newAccessToken = tokenStorage.getAccessToken();
      if (newAccessToken) {
        headers["Authorization"] = `Bearer ${newAccessToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  }

  private async handleTokenRefresh(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();

    if (refreshToken) {
      try {
        const tokens = await authService.refresh(refreshToken);
        tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
      } catch (error) {
        // Refresh token cũng không hợp lệ, xóa tokens
        tokenStorage.clear();
        this.isRefreshing = false;
        this.refreshPromise = null;
        // Import và dừng token refresh service
        if (typeof globalThis.window !== "undefined") {
          import("../utils/tokenRefresh").then((module) => {
            module.tokenRefreshService.stop();
          });
          globalThis.window.location.href = "/login";
        }
        throw error;
      }
    } else {
      tokenStorage.clear();
      if (typeof globalThis.window !== "undefined") {
        globalThis.window.location.href = "/login";
      }
    }

    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
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
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const httpClient = new HttpClient();
