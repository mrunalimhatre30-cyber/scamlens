import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser, demoLoginUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getCurrentUser();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data.success && data.user) {
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password, confirmPassword) => {
    const data = await registerUser(name, email, password, confirmPassword);
    if (data.success && data.user) {
      setUser(data.user);
    }
    return data;
  };

  const demoLogin = async () => {
    const data = await demoLoginUser();
    if (data.success && data.user) {
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const data = await getCurrentUser();
      if (data.authenticated && data.user) {
        setUser(data.user);
      }
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, demoLogin, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
