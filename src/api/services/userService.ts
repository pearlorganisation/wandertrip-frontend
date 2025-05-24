
import { apiClient } from "../client";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: Record<string, any>;
}

/**
 * User API service
 */
export const userService = {
  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/user/profile');
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.patch<User>('/user/profile', data);
  },

  /**
   * Update user preferences
   */
  updatePreferences: async (preferences: Record<string, any>): Promise<User> => {
    return apiClient.patch<User>('/user/preferences', { preferences });
  },
};
