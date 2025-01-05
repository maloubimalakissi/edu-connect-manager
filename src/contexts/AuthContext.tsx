import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '@/services/api';
import type { User, LoginResponse } from '@/types/auth';

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
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      const userData = JSON.parse(userStr);
      // Map the stored user data to match User type
      setUser({
        id: userData._id || userData.id, // Handle both _id and id
        name: userData.name,
        email: userData.email,
        ecole: userData.ecole
      });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response: LoginResponse = await login(email, password);
      localStorage.setItem('token', response.token);
      // Map API response to User type before storing
      const userData: User = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        ecole: response.user.ecole
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
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
    localStorage.removeItem('user');
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