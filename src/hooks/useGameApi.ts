import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api/axios';
import { GameSearchRequest, GameSearchResponse, GameDetails, GameTag } from '../types/game';

export const useGameApi = () => {
  const queryClient = useQueryClient();

  // Hook para buscar tags de gêneros
  const useTags = (count?: number) => {
    return useQuery({
      queryKey: ['gameTags', count],
      queryFn: async () => {
        const params = count ? { count } : undefined;
        const response = await api.get<GameTag[]>('/game/tags', { params });
        return response.data;
      }
    });
  };
  
  // Hook para buscar detalhes de um jogo
  const useGameDetails = (id: string | undefined) => {
    return useQuery({
      queryKey: ['gameDetails', id],
      queryFn: async () => {
        if (!id) throw new Error('ID do jogo não fornecido');
        const response = await api.get<GameDetails>(`/game/${id}`);
        return response.data;
      },
      enabled: !!id
    });
  };
  
  // Hook para buscar resultados de pesquisa
  const useSearchResults = (searchId: string | null) => {
    return useQuery({
      queryKey: ['gameResults', searchId],
      queryFn: async () => {
        if (!searchId) throw new Error('ID de busca não fornecido');
        const response = await api.get<GameSearchResponse>(`/game/${searchId}`);
        return response.data;
      },
      enabled: !!searchId
    });
  };
  
  // Mutation hook para realizar busca
  const useSearchGames = () => {
    return useMutation({
      mutationFn: async (request: GameSearchRequest) => {
        const response = await api.post<GameSearchResponse>('/game/search', request);
        return response.data;
      },
      onSuccess: () => {
        // Invalidar caches relevantes quando uma nova busca for bem-sucedida
        queryClient.invalidateQueries({ queryKey: ['gameResults'] });
      }
    });
  };

  return {
    useTags,
    useGameDetails,
    useSearchResults,
    useSearchGames
  };
};