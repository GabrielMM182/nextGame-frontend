import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { useGameApi } from '../hooks/useGameApi';
import TagSelector from '../components/features/TagSelector';
import SearchResults from '../components/features/SearchResults';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const GamePage = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const { selectedTags, searchId, setSearchId } = useGameStore();
  
  // Utilizando os hooks customizados
  const { useTags, useSearchGames, useSearchResults } = useGameApi();
  
  // Buscar tags disponíveis com o hook customizado
  const { 
    data: availableTags, 
    isLoading: isLoadingTags, 
    error: tagsError,
    refetch: refetchTags, 
    isFetching: isRefetchingTags
  } = useTags(10);
  
  // Obter os resultados da busca atual (se houver)
  const { data: searchResults } = useSearchResults(searchId);
  
  // Mutação para buscar jogos usando o hook customizado
  const { 
    mutate: searchGames, 
    isPending: isSearching,
    error: searchError 
  } = useSearchGames();
  
  const handleSearch = () => {
    if (selectedTags.length === 0) return;
    
    searchGames({
      tags: selectedTags.map(tag => tag.name)
    }, {
      onSuccess: (data) => {
        setSearchId(data.searchId);
        setShowResults(true);
        
        // Se já tivermos detalhes do jogo e rawgId, podemos navegar diretamente
        if (data.gameDetails?.rawgId) {
          navigate(`/game/${data.gameDetails.rawgId}`);
        }
      }
    });
  };
  
  const viewGameDetails = (gameId: string) => {
    // Se temos o resultado da busca atual e ele tem um gameDetails com rawgId, usamos ele
    if (searchResults?.gameDetails?.rawgId) {
      navigate(`/game/${searchResults.gameDetails.rawgId}`);
    } else {
      // Caso contrário, usamos o ID passado (pode ser o ID do MongoDB ou o rawgId)
      navigate(`/game/${gameId}`);
    }
  };
  
  if (isLoadingTags) return <LoadingSpinner />;
  if (tagsError) return <ErrorMessage message="Erro ao carregar tags de jogos" />;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Recomendação de Jogos</h1>
      
      {!showResults ? (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Selecione até 6 gêneros de jogos que você gosta
          </h2>
          
          {availableTags && (
            <TagSelector availableTags={availableTags} refetchTags={refetchTags} isRefetching={isRefetchingTags} />
          )}
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSearch}
              disabled={selectedTags.length === 0 || isSearching}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Buscando...' : 'Buscar Recomendações'}
            </button>
          </div>
          
          {searchError && (
            <div className="mt-4 text-red-600 text-center">
              Ocorreu um erro na busca. Tente novamente.
            </div>
          )}
        </div>
      ) : (
        <>
          {searchId && <SearchResults searchId={searchId} onGameClick={viewGameDetails} />}
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowResults(false)}
              className="bg-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
            >
              Nova Busca
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage; 