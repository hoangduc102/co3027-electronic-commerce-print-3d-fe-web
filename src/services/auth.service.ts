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

class AuthService {
  private readonly baseUrl = API_CONFIG.API_BASE_URL;

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}${AUTH_ENDPOINTS.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Đăng ký thất bại",
      }));
      // Backend có thể trả về message là string hoặc array
      const errorMessage = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Đăng ký thất bại";
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async login(loginData: LoginDto): Promise<AuthResponse> {
    const url = `${this.baseUrl}${AUTH_ENDPOINTS.LOGIN}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => {
        // Nếu không parse được JSON, thử lấy text
        return response.text().then((text) => ({
          message: text || "Đăng nhập thất bại",
        }));
      });

      // Backend có thể trả về message là string hoặc array
      const errorMessage = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Đăng nhập thất bại";
      throw new Error(errorMessage);
    }

    const responseData = await response.json().catch((parseError) => {
      console.error("Failed to parse JSON response:", parseError);
      throw new Error("Không thể parse response từ server");
    });

    // Validate response structure
    if (!responseData || typeof responseData !== "object") {
      console.error("Invalid response format:", responseData);
      throw new Error("Response không hợp lệ từ server");
    }

    // Try to extract tokens from various possible structures
    // 1. Direct access
    let accessToken = responseData.accessToken || responseData.access_token;
    let refreshToken = responseData.refreshToken || responseData.refresh_token;

    // 2. Nested in data property
    if (!accessToken && responseData.data) {
      accessToken =
        responseData.data.accessToken || responseData.data.access_token;
      refreshToken =
        responseData.data.refreshToken || responseData.data.refresh_token;
    }

    // 3. Nested in result property
    if (!accessToken && responseData.result) {
      accessToken =
        responseData.result.accessToken || responseData.result.access_token;
      refreshToken =
        responseData.result.refreshToken || responseData.result.refresh_token;
    }

    if (!accessToken || !refreshToken) {
      console.error("Missing tokens in response:", {
        hasAccessToken: !!responseData.accessToken,
        hasRefreshToken: !!responseData.refreshToken,
        hasAccess_token: !!responseData.access_token,
        hasRefresh_token: !!responseData.refresh_token,
        hasData: !!responseData.data,
        hasResult: !!responseData.result,
        fullResponse: responseData,
      });
      throw new Error(
        `Không nhận được tokens từ server. Response structure: ${JSON.stringify(Object.keys(responseData))}`
      );
    }

    // Extract user from response
    const user =
      responseData.user || responseData.data?.user || responseData.result?.user;

    if (!user) {
      console.error("Missing user in response:", responseData);
      throw new Error("Không nhận được thông tin user từ server");
    }

    // Normalize response to camelCase
    return {
      accessToken,
      refreshToken,
      user,
    } as AuthResponse;
  }

  async refresh(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(`${this.baseUrl}${AUTH_ENDPOINTS.REFRESH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Làm mới token thất bại",
      }));
      // Refresh token hết hạn, cần đăng nhập lại
      const errorMessage = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Token đã hết hạn. Vui lòng đăng nhập lại.";
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async getCurrentUser(accessToken: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}${AUTH_ENDPOINTS.ME}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Nếu token hết hạn (401), thử refresh token
    if (response.status === 401) {
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        try {
          // Refresh token
          const tokens = await this.refresh(refreshToken);
          tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);

          // Retry request với token mới
          const retryResponse = await fetch(
            `${this.baseUrl}${AUTH_ENDPOINTS.ME}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!retryResponse.ok) {
            const error = await retryResponse.json().catch(() => ({
              message: "Không thể lấy thông tin người dùng",
            }));
            const errorMessage = Array.isArray(error.message)
              ? error.message.join(", ")
              : error.message || "Không thể lấy thông tin người dùng";
            throw new Error(errorMessage);
          }

          return retryResponse.json();
        } catch {
          // Refresh token cũng không hợp lệ, xóa tokens
          tokenStorage.clear();
          throw new Error(
            "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
          );
        }
      } else {
        // Không có refresh token, xóa storage
        tokenStorage.clear();
        throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Không thể lấy thông tin người dùng",
      }));
      const errorMessage = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Không thể lấy thông tin người dùng";
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async logout(accessToken: string, refreshToken?: string): Promise<void> {
    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const body = refreshToken ? JSON.stringify({ refreshToken }) : undefined;

    const response = await fetch(`${this.baseUrl}${AUTH_ENDPOINTS.LOGOUT}`, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Logout failed",
      }));
      throw new Error(error.message || "Logout failed");
    }
  }
}

export const authService = new AuthService();
