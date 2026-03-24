import type { UpdateUserProfileRequest, UserProfile, UserStats } from "@/types";
import { USER_ENDPOINTS } from "@/utils/endpoints";
import { apiClient } from "./axios.config";

class UserService {
  async getUserProfile(userId: string | number): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>(
      USER_ENDPOINTS.PROFILE(userId),
    );
    return response.data as UserProfile;
  }

  async updateUserProfile(
    userId: string | number,
    data: UpdateUserProfileRequest,
  ): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>(
      USER_ENDPOINTS.UPDATE(userId),
      data,
    );
    return response.data as UserProfile;
  }

  async getUserStats(userId: string | number): Promise<UserStats> {
    const response = await apiClient.get<UserStats>(
      USER_ENDPOINTS.DETAIL(userId), // Note: May need separate STATS endpoint
    );
    return response.data as UserStats;
  }

  async deleteUser(userId: string | number) {
    await apiClient.delete(USER_ENDPOINTS.DELETE(userId));
  }

  async changePassword(
    userId: string | number,
    passwordData: Record<string, unknown>,
  ) {
    const response = await apiClient.put(
      USER_ENDPOINTS.CHANGE_PASSWORD(userId),
      passwordData,
    );
    return response.data;
  }
}

export const userService = new UserService();
