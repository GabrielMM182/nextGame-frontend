import { useGameApi } from '../../hooks/useGameApi';
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
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Jogos Recomendados
      </h2>
      
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
    </div>
  );
};

export default SearchResults;