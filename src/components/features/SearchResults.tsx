import { useGameApi } from '../../hooks/useGameApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  searchId: string;
  onGameClick: (gameId: string) => void;
}

const SearchResults = ({ searchId, onGameClick }: SearchResultsProps) => {
  // Utilizando o hook customizado para buscar resultados
  const { useSearchResults } = useGameApi();
  const { 
    data: gameResults, 
    isLoading, 
    error 
  } = useSearchResults(searchId);
  
  const navigate = useNavigate();
  
  if (isLoading) return <LoadingSpinner />;
  
  if (error) return (
    <ErrorMessage message="Erro ao carregar recomendações. Tente novamente." />
  );
  
  if (!gameResults || !gameResults.name) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">
          Nenhuma recomendação encontrada. Tente com diferentes gêneros.
        </p>
      </div>
    );
  }
  
  // Verificar se temos detalhes do jogo diretamente do RAWG
  const hasGameDetails = !!gameResults.gameDetails;
  
  // Criar um item de resumo padrão se não tivermos nenhum resultado na lista summary
  const hasSummaryItems = gameResults.summary && gameResults.summary.length > 0;
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Jogos Recomendados
      </h2>
      
      {hasGameDetails ? (
        // Exibe o card com os detalhes recebidos diretamente da API RAWG
        <div className="grid grid-cols-1 gap-6">
          <div 
            onClick={() => gameResults.gameDetails?.rawgId && onGameClick(gameResults.gameDetails.rawgId)}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {gameResults.gameDetails?.boxArt ? (
              <img 
                src={gameResults.gameDetails.boxArt} 
                alt={gameResults.gameDetails.name} 
                className="w-full h-64 object-cover"
              />
            ) : (
              gameResults.gameDetails?.images && gameResults.gameDetails.images.length > 0 && (
                <img 
                  src={gameResults.gameDetails.images[0]} 
                  alt={gameResults.gameDetails.name} 
                  className="w-full h-64 object-cover"
                />
              )
            )}
            
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {gameResults.gameDetails?.name || gameResults.name}
              </h3>
              
              {gameResults.gameDetails?.summary && (
                <p className="text-gray-700 line-clamp-4">
                  {gameResults.gameDetails.summary}
                </p>
              )}
              
              {gameResults.gameDetails?.platforms && gameResults.gameDetails.platforms.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">Plataformas:</h4>
                  <div className="flex flex-wrap gap-1">
                    {gameResults.gameDetails.platforms.map((platform, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {gameResults.gameDetails?.releaseYear && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">Ano de lançamento:</h4>
                  <p>{gameResults.gameDetails.releaseYear}</p>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <span className="text-sm text-indigo-600 hover:underline">
                  Ver detalhes →
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSummaryItems ? (
        // Exibe os resultados na forma antiga se tiver itens no summary
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameResults.summary.map((game) => (
            <div 
              key={game.id}
              onClick={() => onGameClick(game.id)}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {game.background_image && (
                <img 
                  src={game.background_image} 
                  alt={game.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {game.title}
                </h3>
                <p className="text-gray-700 line-clamp-3">
                  {game.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="text-sm text-indigo-600 hover:underline">
                    Ver detalhes →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Exibe apenas o nome do jogo quando não temos detalhes nem items no summary
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {gameResults.name}
            </h3>
            <p className="text-gray-700">
              Foi encontrado um jogo que corresponde às suas preferências.
            </p>
            {gameResults.searchId && (
              <button
                onClick={() => onGameClick(gameResults.searchId)}
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Ver detalhes do jogo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;