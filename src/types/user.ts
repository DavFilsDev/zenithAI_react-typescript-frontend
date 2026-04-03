export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  credits?: number;
  isPremium?: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  password2: string; 
  firstName?: string;
  lastName?: string; 
}