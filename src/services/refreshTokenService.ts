import axios from 'axios';
import { tokenManager } from './tokenManager';

export const refreshTokenService = {
  async refresh(): Promise<string> {
    const refreshToken = tokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    
    const response = await axios.post(
      `${apiUrl}/auth/token/refresh/`,
      { refresh: refreshToken }
    );

    if (!response.data?.access) {
      throw new Error('Invalid refresh response');
    }

    const newAccessToken = response.data.access;
    tokenManager.setTokens(newAccessToken, refreshToken);
    
    return newAccessToken;
  },

  async refreshWithRetry(originalRequest: any, api: any): Promise<any> {
    try {
      const newAccessToken = await this.refresh();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (error) {
      tokenManager.clearTokens();
      window.location.href = '/login';
      throw error;
    }
  },
};