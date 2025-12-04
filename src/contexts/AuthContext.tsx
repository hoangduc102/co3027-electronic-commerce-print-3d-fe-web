"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { authService, LoginDto, RegisterDto } from "../services/auth.service";
import { tokenStorage, User } from "../utils/tokenStorage";
import { tokenRefreshService, setOnRefreshFailed } from "../utils/tokenRefresh";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Xử lý khi refresh token thất bại
  const handleRefreshFailed = useCallback(() => {
    console.warn("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    setUser(null);
    // Có thể thêm redirect về trang login ở đây nếu cần
  }, []);

  useEffect(() => {
    // Đăng ký callback khi refresh token thất bại
    setOnRefreshFailed(handleRefreshFailed);

    // Kiểm tra xem user đã đăng nhập chưa khi app load
    const initAuth = async () => {
      const storedUser = tokenStorage.getUser();
      const accessToken = tokenStorage.getAccessToken();

      if (storedUser && accessToken) {
        try {
          // Verify token còn hợp lệ không
          const currentUser = await authService.getCurrentUser(accessToken);
          setUser(currentUser);
          tokenStorage.setUser(currentUser);

          // Bắt đầu tự động refresh token
          tokenRefreshService.start();
        } catch {
          // Token không hợp lệ, thử refresh
          const refreshToken = tokenStorage.getRefreshToken();
          if (refreshToken) {
            try {
              const tokens = await authService.refresh(refreshToken);
              tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
              const currentUser = await authService.getCurrentUser(
                tokens.accessToken
              );
              setUser(currentUser);
              tokenStorage.setUser(currentUser);

              // Bắt đầu tự động refresh token
              tokenRefreshService.start();
            } catch {
              // Refresh cũng không được, xóa storage
              tokenStorage.clear();
              setUser(null);
            }
          } else {
            tokenStorage.clear();
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [handleRefreshFailed]);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const loginData: LoginDto = { emailOrUsername, password };
      const response = await authService.login(loginData);

      // Validate response before saving
      if (!response.accessToken || !response.refreshToken) {
        console.error("Missing tokens in response:", response);
        throw new Error("Không nhận được tokens từ server");
      }

      // Save tokens
      tokenStorage.setTokens(response.accessToken, response.refreshToken);
      tokenStorage.setUser(response.user);

      setUser(response.user);

      // Bắt đầu tự động refresh token
      tokenRefreshService.start();
    } catch (error) {
      console.error("Login error:", error);
      // Re-throw để component có thể xử lý
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const registerData: RegisterDto = { username, email, password };
    const response = await authService.register(registerData);
    tokenStorage.setTokens(response.accessToken, response.refreshToken);
    tokenStorage.setUser(response.user);
    setUser(response.user);

    // Bắt đầu tự động refresh token
    tokenRefreshService.start();
  };

  const logout = async () => {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    try {
      if (accessToken) {
        await authService.logout(accessToken, refreshToken || undefined);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      tokenStorage.clear();
      setUser(null);
      // Dừng tự động refresh token
      tokenRefreshService.stop();
    }
  };

  const refreshUser = async () => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      try {
        const currentUser = await authService.getCurrentUser(accessToken);
        tokenStorage.setUser(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to refresh user:", error);
      }
    }
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
