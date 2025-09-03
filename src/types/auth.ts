export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: string;
  dateOfBirth?: string;
  address?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

export type AuthView = 'register' | 'login' | 'forgot-password' | 'home';