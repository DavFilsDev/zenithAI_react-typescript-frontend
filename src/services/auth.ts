import api from './api';
import { tokenManager } from './tokenManager';
import { ApiError } from './apiError';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types/user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/token/', credentials);
      const { access, refresh } = response.data;

      if (!access || !refresh) {
        throw new Error('Invalid response from server');
      }

      tokenManager.setTokens(access, refresh);

      const userResponse = await api.get('/auth/profile/');
      
      return {
        access,
        refresh,
        user: userResponse.data,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.fromAxiosError(error);
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const backendData = {
        email: credentials.email,
        username: credentials.username,
        password: credentials.password,
        password2: credentials.password2,
      };
      
      const response = await api.post('/auth/register/', backendData);
      
      if (response.data.access && response.data.refresh) {
        tokenManager.setTokens(response.data.access, response.data.refresh);
        
        const userResponse = await api.get('/auth/profile/');
        return {
          access: response.data.access,
          refresh: response.data.refresh,
          user: userResponse.data,
        };
      }
      
      return {
        access: '',
        refresh: '',
        user: response.data,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.fromAxiosError(error);
    }
  },
  
  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.fromAxiosError(error);
    }
  },

  logout(): void {
    tokenManager.clearTokens();
  },
};