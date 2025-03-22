import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/api/authService';
import { useAuthStore } from '../store/useAuthStore';

export const useAuthApi = () => {
  const queryClient = useQueryClient();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  // Login
  const useLoginMutation = () => {
    return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
        return await authService.login(email, password);
      },
      onSuccess: (data) => {
        storeLogin(data);
        // Quando o login for bem-sucedido, invalidar o cache do histórico
        queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
      },
    });
  };

  // Registro
  const useRegisterMutation = () => {
    return useMutation({
      mutationFn: async ({ 
        name, 
        email, 
        password 
      }: { 
        name: string; 
        email: string; 
        password: string; 
      }) => {
        return await authService.register(name, email, password);
      },
    });
  };
  
  // Logout
  const useLogout = () => {
    return () => {
      storeLogout();
      queryClient.clear(); // Limpa o cache
    };
  };

  // Histórico de pesquisas
  const useHistoryQuery = () => {
    const { isAuthenticated, token } = useAuthStore();

    return useQuery({
      queryKey: ['searchHistory'],
      queryFn: async () => {
        if (!isAuthenticated || !token) {
          console.error('Tentando buscar histórico sem autenticação');
          return [];
        }
        
        try {
          return await authService.getHistory();
        } catch (error) {
          console.error('Erro ao buscar histórico:', error);
          throw error;
        }
      },
      enabled: isAuthenticated && !!token,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutos
    });
  };

  return {
    useLoginMutation,
    useRegisterMutation,
    useLogout,
    useHistoryQuery,
  };
}; 