import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../hooks/useAuthApi';
import { useAuthStore } from '../store/useAuthStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Seu Histórico de Pesquisas</h1>
      
      {history && history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item: HistoryItem) => (
            <div 
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.gameDetails?.images && item.gameDetails.images[0] ? (
                <img 
                  src={item.gameDetails.images[0]} 
                  alt={item.gameDetails.name || item.recommendedGame?.name || 'Jogo'} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {item.gameDetails?.name || item.recommendedGame?.name || 'Jogo Recomendado'}
                </h3>
                
                {item.gameDetails?.summary && (
                  <p className="text-gray-700 line-clamp-3">
                    {item.gameDetails.summary}
                  </p>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Tags:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate(`/game/${item.recommendedGame?.rawgId || item.gameDetails?.rawgId || item._id}`)}
                    className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                  >
                    Ver detalhes →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Nenhuma pesquisa realizada ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Experimente buscar por jogos na página inicial
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Ir para busca
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage; 