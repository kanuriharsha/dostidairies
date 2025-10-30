import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import apiUrl from '../lib/api';
import { User } from '../lib/types';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  getToken: () => string | null;
};

// Use apiUrl helper for each endpoint to avoid accidental localhost/duplicate-slash issues

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  };

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl('api/me'), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user ?? null);
        }
      } catch (err) {
        setUser(null);
      }

      setLoading(false);
    })();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const res = await fetch(apiUrl('api/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message || 'Signup failed' };
      // do not automatically sign in; let user login
      return {};
    } catch (err: any) {
      return { error: err.message || 'Signup failed' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(apiUrl('api/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message || 'Login failed' };
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user ?? null);
        return {};
      }
      return { error: 'Login failed' };
    } catch (err: any) {
      return { error: err.message || 'Login failed' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
