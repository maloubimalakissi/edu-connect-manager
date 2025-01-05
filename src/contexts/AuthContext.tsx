import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '@/services/api';
import type { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // For demo purposes, we'll create a mock user
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@school.com',
      });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      setUser({
        id: '1',
        name: 'Admin User',
        email: email,
      });
      toast.success('Connexion réussie');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Email ou mot de passe incorrect');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
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