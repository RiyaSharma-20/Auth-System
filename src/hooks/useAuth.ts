import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

const STORAGE_KEY = 'auth_users';
const CURRENT_USER_KEY = 'current_user';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null
  });

  useEffect(() => {
    // Check if user is already logged in
    const currentUserData = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserData) {
      const user = JSON.parse(currentUserData);
      setAuthState({
        isAuthenticated: true,
        currentUser: user
      });
    }
  }, []);

  const register = (userData: Omit<User, 'id' | 'createdAt'>): boolean => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.some((user: User) => user.email === userData.email);
      if (userExists) {
        return false;
      }

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingUsers));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const login = (email: string, password: string): boolean => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const user = existingUsers.find((user: User) => 
        user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        setAuthState({
          isAuthenticated: true,
          currentUser: user
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setAuthState({
      isAuthenticated: false,
      currentUser: null
    });
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!authState.currentUser) return false;

    try {
      const updatedUser = { ...authState.currentUser, ...updatedData };
      
      // Update in localStorage users array
      const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const userIndex = existingUsers.findIndex((user: User) => user.id === updatedUser.id);
      
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingUsers));
        
        // Update current user
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
        setAuthState({
          isAuthenticated: true,
          currentUser: updatedUser
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update user failed:', error);
      return false;
    }
  };

  return {
    authState,
    register,
    login,
    logout,
    updateUser
  };
};