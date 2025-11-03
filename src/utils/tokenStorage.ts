const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const tokenStorage = {
  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof globalThis.window !== "undefined") {
      globalThis.window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      globalThis.window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  getAccessToken(): string | null {
    if (typeof globalThis.window !== "undefined") {
      return globalThis.window.localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  },

  getRefreshToken(): string | null {
    if (typeof globalThis.window !== "undefined") {
      return globalThis.window.localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  },

  setUser(user: User | null): void {
    if (typeof globalThis.window !== "undefined") {
      if (user) {
        globalThis.window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        globalThis.window.localStorage.removeItem(USER_KEY);
      }
    }
  },

  getUser(): User | null {
    if (typeof globalThis.window !== "undefined") {
      const userStr = globalThis.window.localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  clear(): void {
    if (typeof globalThis.window !== "undefined") {
      globalThis.window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      globalThis.window.localStorage.removeItem(REFRESH_TOKEN_KEY);
      globalThis.window.localStorage.removeItem(USER_KEY);
    }
  },
};

export interface User {
  id: string;
  email: string;
  username: string;
  role: "CUSTOMER" | "ADMIN";
}
