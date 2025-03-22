import { useGameApi } from '../../hooks/useGameApi';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

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
  
  // Verifica se existem itens no summary array
  const hasSummaryItems = gameResults.summary && gameResults.summary.length > 0;
  
  const handleViewFullDetails = () => {
    if (gameResults.gameDetails?.rawgId) {
      navigate(`/game/${gameResults.gameDetails.rawgId}`);
    } else if (gameResults.searchId) {
      onGameClick(gameResults.searchId);
    }
  };
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Jogo Recomendado para Você
      </h2>
      
      {hasGameDetails && gameResults.gameDetails ? (
        // Exibe os detalhes completos do jogo quando temos gameDetails
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            {gameResults.gameDetails.images && gameResults.gameDetails.images.length > 0 ? (
              <img 
                src={gameResults.gameDetails.images[0]} 
                alt={gameResults.gameDetails.name} 
                className="w-full h-64 object-cover"
              />
            ) : gameResults.gameDetails.boxArt ? (
              <img 
                src={gameResults.gameDetails.boxArt} 
                alt={gameResults.gameDetails.name} 
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">Imagem não disponível</span>
              </div>
            )}
            
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                {gameResults.gameDetails.name}
              </h3>
              
              {gameResults.gameDetails.summary && (
                <p className="text-gray-700 mb-4">
                  {gameResults.gameDetails.summary}
                </p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {gameResults.gameDetails.releaseYear && (
                  <div>
                    <h4 className="font-medium text-gray-900">Ano de lançamento:</h4>
                    <p className="text-gray-700">{gameResults.gameDetails.releaseYear}</p>
                  </div>
                )}
                
                {gameResults.gameDetails.platforms && gameResults.gameDetails.platforms.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900">Plataformas:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
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
              </div>
              
              <button
                onClick={handleViewFullDetails}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Ver detalhes completos
              </button>
            </div>
          </div>
        </div>
      ) : hasSummaryItems ? (
        // Exibe os resultados na forma antiga se tiver itens no summary (lista de jogos)
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
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-6 text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            {gameResults.name}
          </h3>
          <p className="text-gray-700 mb-6">
            Foi encontrado um jogo que corresponde às suas preferências.
          </p>
          {gameResults.searchId && (
            <button
              onClick={() => onGameClick(gameResults.searchId)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Ver detalhes do jogo
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;