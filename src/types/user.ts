export interface User {
  id: string;
  email: string;
  username: string;
  credits?: number;
  is_premium?: boolean;
  firstName?: string;
  lastName?: string;
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
  email: string;
  username: string;
  password: string;
  password2: string; 
}