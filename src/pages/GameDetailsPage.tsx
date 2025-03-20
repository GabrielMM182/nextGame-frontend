import { useParams, useNavigate } from 'react-router-dom';
import { useGameApi } from '../hooks/useGameApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useEffect, useState } from 'react';
import { GameDetails } from '../types/game';
import api from '../services/api/axios';

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mongoGame, setMongoGame] = useState<{ name: string } | null>(null);
  const [isMongoLoading, setIsMongoLoading] = useState(false);
  const [mongoError, setMongoError] = useState<Error | null>(null);
  
  // Utilizando o hook customizado para buscar detalhes do jogo
  const { useGameDetails } = useGameApi();
  const { 
    data: game, 
    isLoading, 
    error 
  } = useGameDetails(id);
  
  // Se não encontrarmos o jogo pela API do RAWG, tenta buscar pelo MongoDB
  useEffect(() => {
    if (!isLoading && !game && id) {
      // Tentamos buscar do MongoDB
      setIsMongoLoading(true);
      api.get(`/game/${id}`)
        .then(response => {
          if (response.data && response.data.recommendedGame) {
            setMongoGame({
              name: response.data.recommendedGame.name || 'Jogo Recomendado'
            });
          } else if (response.data && response.data.gameSummary) {
            setMongoGame({
              name: response.data.gameSummary.name || 'Jogo Recomendado'
            });
          }
        })
        .catch(err => {
          console.error('Erro ao buscar jogo do MongoDB:', err);
          setMongoError(err as Error);
        })
        .finally(() => {
          setIsMongoLoading(false);
        });
    }
  }, [id, isLoading, game]);
  
  if (isLoading || isMongoLoading) return <LoadingSpinner />;
  
  if (!game && !mongoGame) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorMessage message="Erro ao carregar detalhes do jogo" />
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }
  
  // Se temos apenas os dados básicos do MongoDB
  if (!game && mongoGame) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para resultados
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{mongoGame.name}</h1>
          <p className="text-gray-700 mb-6">
            Este é o jogo recomendado com base nos gêneros que você selecionou.
          </p>
          <p className="text-gray-600">
            Não foi possível obter detalhes adicionais deste jogo no momento.
          </p>
        </div>
      </div>
    );
  }
  
  // Se temos os detalhes completos do RAWG
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Voltar para resultados
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {game?.background_image && (
          <div className="relative h-80">
            <img 
              src={game.background_image} 
              alt={game.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{game?.name}</h1>
            
            {game?.metacritic && (
              <div className={`
                px-3 py-1 rounded-full font-bold
                ${game.metacritic >= 80 ? 'bg-green-100 text-green-800' : 
                  game.metacritic >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}
              `}>
                Metacritic: {game.metacritic}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-2">Sobre o jogo</h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: game?.description || '' }}
              />
            </div>
            
            <div className="space-y-6">
              {game?.released && (
                <div>
                  <h3 className="text-lg font-medium mb-1">Data de lançamento</h3>
                  <p className="text-gray-700">
                    {new Date(game.released).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}
              
              {game?.platforms && game.platforms.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-1">Plataformas</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {game?.genres && game.genres.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-1">Gêneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {game?.screenshots && game.screenshots.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {game.screenshots.map((screenshot, index) => (
                  <img 
                    key={index}
                    src={screenshot} 
                    alt={`Screenshot ${index + 1} de ${game.name}`}
                    className="rounded-lg w-full h-48 object-cover shadow hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;