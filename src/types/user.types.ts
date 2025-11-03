import { User } from "@/utils/tokenStorage";

export interface UserProfile extends User {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  username?: string;
  email?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: "CUSTOMER" | "ADMIN";
    updatedAt: string;
  };
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface DeleteAccountDto {
  password: string;
}

export interface DeleteAccountResponse {
  message: string;
}
