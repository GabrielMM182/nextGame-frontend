import React from 'react';
import { GameTag } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface TagSelectorProps {
  availableTags: { tags: string[] } | GameTag[];
}

const TagSelector: React.FC<TagSelectorProps> = ({ availableTags }) => {
  const { selectedTags, addTag, removeTag } = useGameStore();
  
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
  
  const isSelected = (tag: GameTag) => {
    return selectedTags.some(t => t.id === tag.id);
  };
  
  const isTagsLimitReached = selectedTags.length >= 6;

  console.log('availableTags:', availableTags);
  console.log('type:', typeof availableTags);
  console.log('isArray:', Array.isArray(availableTags));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {selectedTags.length > 0 ? (
          selectedTags.map(tag => (
            <div 
              key={tag.id}
              className="bg-indigo-100 border-2 border-indigo-500 text-indigo-800 px-3 py-1 rounded-full flex items-center"
            >
              <span className="mr-1">{tag.name}</span>
              <button
                onClick={() => removeTag(tag.id)}
                className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
              >
                <span className="sr-only">Remover</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">Nenhum gênero selecionado</div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Gêneros disponíveis:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {processedTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => !isSelected(tag) && !isTagsLimitReached && addTag(tag)}
              disabled={isSelected(tag) || isTagsLimitReached}
              className={`px-3 py-2 rounded border transition-colors ${
                isSelected(tag)
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-800 cursor-default'
                  : isTagsLimitReached
                  ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-300 hover:bg-gray-50 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
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