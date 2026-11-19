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
import { authService, AuthResponse } from "../services/auth.service";
import { tokenStorage, User } from "../utils/tokenStorage";
import { tokenRefreshService } from "../utils/tokenRefresh";

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

  const clearSession = useCallback(() => {
    tokenRefreshService.stop();
    tokenStorage.clear();
    setUser(null);
  }, []);

  const startSession = useCallback((response: AuthResponse) => {
    tokenStorage.setTokens(response.accessToken, response.refreshToken);
    tokenStorage.setUser(response.user);
    setUser(response.user);
    tokenRefreshService.start();
  }, []);

  useEffect(() => {
    // Khi refresh token thất bại ở bất kỳ đâu → đăng xuất phía client
    authService.onSessionExpired(() => {
      tokenRefreshService.stop();
      setUser(null);
    });

    const initAuth = async () => {
      const accessToken = tokenStorage.getAccessToken();
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      // Hiển thị ngay user đã lưu trong lúc chờ verify với server
      const storedUser = tokenStorage.getUser();
      if (storedUser) setUser(storedUser);

      try {
        // getCurrentUser tự refresh token nếu nhận 401
        const currentUser = await authService.getCurrentUser(accessToken);
        tokenStorage.setUser(currentUser);
        setUser(currentUser);
        tokenRefreshService.start();
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    void initAuth();

    return () => {
      authService.onSessionExpired(null);
      tokenRefreshService.stop();
    };
  }, [clearSession]);

  const login = useCallback(
    async (emailOrUsername: string, password: string) => {
      const response = await authService.login({ emailOrUsername, password });
      startSession(response);
    },
    [startSession]
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      const response = await authService.register({
        username,
        email,
        password,
      });
      startSession(response);
    },
    [startSession]
  );

  const logout = useCallback(async () => {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (accessToken) {
        await authService.logout(accessToken, refreshToken ?? undefined);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const refreshUser = useCallback(async () => {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) return;
    try {
      const currentUser = await authService.getCurrentUser(accessToken);
      tokenStorage.setUser(currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser]
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
