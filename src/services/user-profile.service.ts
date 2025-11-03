import { httpClient } from "./httpClient";
import {
  UserProfile,
  UpdateProfileDto,
  UpdateProfileResponse,
  ChangePasswordDto,
  ChangePasswordResponse,
  DeleteAccountResponse,
} from "@/types/user.types";

class UserProfileService {
  /**
   * Lấy thông tin profile của user hiện tại
   */
  async getProfile(): Promise<UserProfile> {
    const response = await httpClient.get<{
      data: UserProfile;
      timestamp?: string;
      path?: string;
    }>("/users/profile");
    return response.data;
  }

  /**
   * Cập nhật profile (username và/hoặc email)
   */
  async updateProfile(data: UpdateProfileDto): Promise<UpdateProfileResponse> {
    const response = await httpClient.put<{
      data: UpdateProfileResponse;
      timestamp?: string;
      path?: string;
    }>("/users/profile", data);
    // API trả về data trong object { data: {...}, timestamp, path }
    return response.data;
  }

  /**
   * Đổi mật khẩu
   */
  async changePassword(
    data: ChangePasswordDto
  ): Promise<ChangePasswordResponse> {
    const response = await httpClient.patch<{
      data: ChangePasswordResponse;
      timestamp?: string;
      path?: string;
    }>("/users/password", data);
    // API trả về data trong object { data: {...}, timestamp, path }
    return response.data;
  }

  /**
   * Xóa tài khoản (soft delete)
   */
  async deleteAccount(password: string): Promise<DeleteAccountResponse> {
    const response = await httpClient.request<{
      data: DeleteAccountResponse;
      timestamp?: string;
      path?: string;
    }>("/users/account", {
      method: "DELETE",
      body: JSON.stringify({ password }),
    });
    // API trả về data trong object { data: {...}, timestamp, path }
    return response.data;
  }
}

export const userProfileService = new UserProfileService();
