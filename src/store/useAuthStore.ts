import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  nickname: string;
}

export interface ToastMessage {
  title: string;
  description: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  toastMessage: ToastMessage | null;
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
  setToastMessage: (message: ToastMessage | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      toastMessage: null,
      
      login: ({ token, user }) => set({
        user,
        token,
        isAuthenticated: true,
      }),
      
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),

      setToastMessage: (message) => set({
        toastMessage: message
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = localStorage.getItem(name);
          if (!value) return null;
          
          const data = JSON.parse(value);
          if (data.state && !data.state.token && data.state.isAuthenticated) {
            data.state.token = localStorage.getItem(`${name}-token`);
          }
          return data;
        },
        setItem: (name, value) => {
          const data = JSON.parse(JSON.stringify(value));
          if (data.state && data.state.token) {
            const token = data.state.token;
            delete data.state.token;
            localStorage.setItem(`${name}-token`, token);
          }
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          localStorage.removeItem(`${name}-token`);
        },
      })),
    }
  )
); 