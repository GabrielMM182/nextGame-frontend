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

// Função para proteger o ID do usuário
const maskUserData = (user: User | null): Partial<User> | null => {
  if (!user) return null;
  return {
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    // O ID não é incluído
  };
};

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
        user: maskUserData(state.user),
        token: state.token, // Incluir o token no estado principal para persistência
        isAuthenticated: state.isAuthenticated,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
); 