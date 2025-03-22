import React, { useEffect, useRef } from 'react';
import { GameTag } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';
import ShakableTag from './ShakableTag';
import RefreshTagsButton from '../features/RefrashTagsButton';

interface TagSelectorProps {
  availableTags: { tags: string[] } | GameTag[];
  refetchTags?: () => void;
  isRefetching?: boolean;
}

const TagSelector: React.FC<TagSelectorProps> = ({ availableTags, refetchTags, isRefetching = false }) => {
  const { selectedTags, addTag, removeTag } = useGameStore();
  const [lastAddedTagId, setLastAddedTagId] = React.useState<string | null>(null);
  const selectedTagsCountRef = useRef<number>(selectedTags.length);

  // Verificar e atualizar a contagem de tags quando a seleção muda
  useEffect(() => {
    selectedTagsCountRef.current = selectedTags.length;
  }, [selectedTags]);

  // processar o array apenas quando availableTags mudar, melhorando a performance
  const processedTags = React.useMemo(() => {
    // Se for um objeto com propriedade 'tags' como o json está vindo no formato object/json entao precsiando extrair o array dentro do objeto
    if (!Array.isArray(availableTags) && availableTags && 'tags' in availableTags) {
      return availableTags.tags.map((tagName, index) => ({
        id: String(index),
        name: tagName
      }));
    }
    
    // Se já for um array de GameTag
    if (Array.isArray(availableTags)) {
      return availableTags;
    }
    
    // Fallback para array vazio
    return [];
  }, [availableTags]);
  
  const handleAddTag = (tag: GameTag) => {
    addTag(tag);
    setLastAddedTagId(tag.id);
    setTimeout(() => setLastAddedTagId(null), 500); // Duração da animação
  };


  const isSelected = (tag: GameTag) => {
    return selectedTags.some(t => t.name === tag.name);
  };
  
  const isTagsLimitReached = selectedTags.length >= 6;

  const handleRefresh = () => {
    if (refetchTags) {
      refetchTags();
    }
  };

  const availableUnselectedTags = processedTags.filter(tag => !isSelected(tag));

  // console.log('availableTags:', availableTags);
  // console.log('type:', typeof availableTags);
  // console.log('isArray:', Array.isArray(availableTags));
  
  return (
    <div className="space-y-6">
      {/* Selected Tags Section */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">Gêneros selecionados ({selectedTags.length}/6):</h3>
        <div className="flex flex-wrap gap-2">
          {selectedTags.length > 0 ? (
            selectedTags.map(tag => (
              <div 
                key={tag.id}
                className="bg-indigo-100 dark:bg-indigo-900 border-2 border-indigo-500 dark:border-indigo-400 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full flex items-center"
              >
                <span className="mr-1">{tag.name}</span>
                <button
                  onClick={() => removeTag(tag.id)}
                  className="text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-100 focus:outline-none"
                >
                  <span className="sr-only">Remover</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">Nenhum gênero selecionado</div>
          )}
        </div>
      </div>
      
      {/* Available Tags Section with Refresh Button */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Gêneros disponíveis:</h3>
          {refetchTags && (
            <RefreshTagsButton onRefresh={handleRefresh} isLoading={isRefetching} />
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {availableUnselectedTags.map(tag => {
            const isDisabled = isTagsLimitReached;
            
            return (
              <ShakableTag 
                key={tag.id} 
                id={tag.id} 
                disabled={isDisabled}
              >
                <button
                  onClick={() => !isDisabled && handleAddTag(tag)}
                  disabled={isDisabled}
                  className={`px-3 py-2 rounded border transition-colors w-full ${
                    isTagsLimitReached
                      ? 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-400 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  }`}
                >
                  {tag.name}
                </button>
              </ShakableTag>
            );
          })}
          
          {availableUnselectedTags.length === 0 && !isRefetching && (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 text-gray-500 dark:text-gray-400 italic py-4 text-center">
              Não há mais gêneros disponíveis. Clique em "Novos gêneros" para obter mais opções.
            </div>
          )}
          
          {isRefetching && (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 text-gray-500 dark:text-gray-400 italic py-4 text-center">
              Carregando novos gêneros...
            </div>
          )}
        </div>
        
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {isTagsLimitReached
            ? 'Limite de 6 gêneros atingido'
            : `Selecione mais ${6 - selectedTags.length} gênero(s)`
          }
        </div>
      </div>
    </div>
  );
};

export default TagSelector;