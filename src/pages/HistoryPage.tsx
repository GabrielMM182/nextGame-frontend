import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../hooks/useAuthApi';
import { useAuthStore } from '../store/useAuthStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';

// Definindo a interface para o item do histórico
interface HistoryItem {
  _id: string;
  tags: string[];
  recommendedGame?: {
    name: string;
    rawgId?: string;
  };
  gameDetails?: {
    name: string;
    rawgId?: string;
    summary?: string;
    images?: string[];
  };
  createdAt: string;
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const { useHistoryQuery } = useAuthApi();
  const { isAuthenticated, token, user } = useAuthStore();
  
  // Redireciona para a página de login se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/auth');
    }
  }, [isAuthenticated, token, navigate]);
  
  const { 
    data: history, 
    isLoading, 
    error, 
    refetch 
  } = useHistoryQuery();
  
  // Forçar a atualização do histórico ao montar o componente
  useEffect(() => {
    if (isAuthenticated && token) {
      refetch();
    }
  }, [isAuthenticated, token, refetch]);
  
  if (!isAuthenticated || !token) {
    return null;
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Seu Histórico de Pesquisas</h1>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Seu Histórico de Pesquisas</h1>
        <ErrorMessage message="Erro ao carregar o histórico. Tente novamente." />
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => refetch()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 mr-4"
          >
            Tentar novamente
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }
  
  console.log('Dados do histórico:', history);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Seu Histórico de Pesquisas</h1>
      
      {history && history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item: HistoryItem) => (
            <div 
              key={item._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.gameDetails?.images && item.gameDetails.images[0] ? (
                <img 
                  src={item.gameDetails.images[0]} 
                  alt={item.gameDetails.name || item.recommendedGame?.name || 'Jogo'} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {item.gameDetails?.name || item.recommendedGame?.name || 'Jogo Recomendado'}
                  </span>
                </div>
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {item.gameDetails?.name || item.recommendedGame?.name || 'Jogo Recomendado'}
                </h2>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Gêneros selecionados:</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags && item.tags.map((tag: string, index: number) => (
                      <span 
                        key={index} 
                        className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  
                  <button
                    onClick={() => navigate(`/game/${item.recommendedGame?.rawgId || item.gameDetails?.rawgId || item._id}`)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Sem histórico de pesquisas</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Você ainda não realizou nenhuma pesquisa de jogos.
              </p>
              <Link 
                to="/game" 
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 inline-block"
              >
                Buscar jogos agora
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage; 