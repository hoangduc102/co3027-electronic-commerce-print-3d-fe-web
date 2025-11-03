export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  API_VERSION: "v1",
  API_PREFIX: "api",

  get API_BASE_URL() {
    return `${this.BASE_URL}/${this.API_PREFIX}/${this.API_VERSION}`;
  },
};

export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
};
