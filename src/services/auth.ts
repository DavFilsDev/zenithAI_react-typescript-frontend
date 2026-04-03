import api from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types/user';

export const authService = {
   async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/token/', credentials);
      
      if (!response.data.access || !response.data.refresh) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const backendData = {
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      password2: credentials.password2,
    };
    
    const response = await api.post('/auth/register/', backendData);
    
    if (response.data.access && response.data.refresh) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    window.location.href = '/login';
  },
};