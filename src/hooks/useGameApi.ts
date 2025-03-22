import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api/axios';
import { 
  GameSearchRequest, 
  GameSearchResponse, 
  GameDetails, 
  GameTag,
  GameDetailsFromApi,
  Platform
} from '../types/game';

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
        
        try {
          // Primeiro, verificamos se temos o jogo nos resultados da busca atual
          const cachedResults = queryClient.getQueryData<GameSearchResponse>(['gameResults']);
          
          if (cachedResults?.gameDetails?.rawgId === id) {
            // Se encontramos o jogo nos resultados e ele tem o mesmo rawgId, convertemos para o formato interno
            return convertApiDetailsToGameDetails(cachedResults.gameDetails);
          }
          
          // Caso contrário, fazemos a requisição normal
          const response = await api.get<GameDetails>(`/game/${id}`);
          return response.data;
        } catch (err) {
          console.error("Erro ao buscar detalhes do jogo:", err);
          throw err;
        }
      },
      enabled: !!id
    });
  };
  
  // Hook para converter GameDetailsFromApi para GameDetails (formato interno)
  const convertApiDetailsToGameDetails = (apiDetails: GameDetailsFromApi): GameDetails => {
    return {
      id: apiDetails.rawgId || '',
      name: apiDetails.name,
      released: apiDetails.releaseYear ? `${apiDetails.releaseYear}-01-01` : '',
      background_image: apiDetails.boxArt || (apiDetails.images && apiDetails.images.length > 0 ? apiDetails.images[0] : ''),
      description: apiDetails.summary || '',
      platforms: apiDetails.platforms ? apiDetails.platforms.map(p => p.name) : [],
      genres: [], // A API RAWG pode não fornecer gêneros na resposta direta
      metacritic: null, // A API RAWG pode não fornecer pontuação na resposta direta
      screenshots: apiDetails.images || []
    };
  };
  
  // Hook para buscar resultados de pesquisa
  const useSearchResults = (searchId: string | null) => {
    return useQuery({
      queryKey: ['gameResults', searchId],
      queryFn: async () => {
        if (!searchId) throw new Error('ID de busca não fornecido');
        
        try {
          // Primeiro verificamos se temos os dados no cache
          const cachedData = queryClient.getQueryData<GameSearchResponse>(['gameResults', searchId]);
          if (cachedData) {
            return cachedData;
          }
          
          // Se não tiver no cache, fazemos a requisição
          const response = await api.get(`/game/${searchId}`);
          
          // Mapear a resposta do backend para o formato esperado pelo frontend
          const backendResponse = response.data;
          console.log('Resposta do backend para useSearchResults:', backendResponse);
          
          // Criar resposta no formato que o frontend espera
          const frontendResponse: GameSearchResponse = {
            name: backendResponse.recommendedGame?.name || '',
            searchId: backendResponse._id || searchId,
            summary: [], // A estrutura antiga esperava uma lista de jogos
            gameDetails: backendResponse.gameDetails
          };
          
          // Se temos recommendedGame mas não temos gameDetails, vamos usar o recommendedGame como base
          if (backendResponse.recommendedGame && !frontendResponse.gameDetails) {
            frontendResponse.gameDetails = {
              name: backendResponse.recommendedGame.name,
              rawgId: backendResponse.recommendedGame.rawgId,
              releaseYear: null,
              platforms: [],
              images: []
            };
          }
          
          // Armazenar detalhes para uso posterior, se disponível
          if (frontendResponse.gameDetails?.rawgId) {
            // Pré-popular o cache com os detalhes do jogo
            queryClient.setQueryData(
              ['gameDetails', frontendResponse.gameDetails.rawgId], 
              convertApiDetailsToGameDetails(frontendResponse.gameDetails)
            );
          }
          
          return frontendResponse;
        } catch (err) {
          console.error("Erro ao buscar resultados da pesquisa:", err);
          throw err;
        }
      },
      enabled: !!searchId
    });
  };
  
  // Mutation hook para realizar busca
  const useSearchGames = () => {
    return useMutation({
      mutationFn: async (request: GameSearchRequest) => {
        const response = await api.post('/game/search', request);
        
        // Mapear a resposta do backend para o formato esperado pelo frontend
        const backendResponse = response.data;
        console.log('Resposta do backend para useSearchGames:', backendResponse);
        
        // Criar resposta no formato que o frontend espera
        const frontendResponse: GameSearchResponse = {
          name: backendResponse.recommendedGame?.name || '',
          searchId: backendResponse._id || backendResponse.gameId,
          summary: [], // A estrutura antiga esperava uma lista de jogos, mas agora temos apenas um
          gameDetails: backendResponse.gameDetails
        };
        
        // Se temos recommendedGame mas não temos gameDetails, vamos usar o recommendedGame como base
        if (backendResponse.recommendedGame && !frontendResponse.gameDetails) {
          frontendResponse.gameDetails = {
            name: backendResponse.recommendedGame.name,
            rawgId: backendResponse.recommendedGame.rawgId,
            releaseYear: null,
            platforms: [],
            images: []
          };
        }
        
        // Se a resposta incluir detalhes do jogo, armazenamos no cache para uso posterior
        if (frontendResponse.gameDetails?.rawgId) {
          queryClient.setQueryData(
            ['gameDetails', frontendResponse.gameDetails.rawgId], 
            convertApiDetailsToGameDetails(frontendResponse.gameDetails)
          );
        }
        
        return frontendResponse;
      },
      onSuccess: (data) => {
        // Armazenar os resultados no cache
        queryClient.setQueryData(['gameResults', data.searchId], data);
        
        // Invalidar caches relevantes quando uma nova busca for bem-sucedida
        queryClient.invalidateQueries({ queryKey: ['gameResults'] });
      }
    });
  };

  return {
    useTags,
    useGameDetails,
    useSearchResults,
    useSearchGames,
    convertApiDetailsToGameDetails
  };
};