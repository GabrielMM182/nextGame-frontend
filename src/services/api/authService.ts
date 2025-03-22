import api from './axios';
import { User } from '../../store/useAuthStore';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  getHistory: async (): Promise<any[]> => {
    try {
      console.log('Buscando histórico de pesquisas...');
      const response = await api.get('/user/history');
      console.log('Resposta do histórico:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      throw error;
    }
  },
}; 