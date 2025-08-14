import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types/blog';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials - in production, this would be handled by a backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@techsolutions.com',
    role: 'admin' as const
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would be an API call
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_CREDENTIALS.user);
      localStorage.setItem('currentUser', JSON.stringify(ADMIN_CREDENTIALS.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};