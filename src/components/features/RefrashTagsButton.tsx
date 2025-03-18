import React from 'react';

interface RefreshTagsButtonProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

const RefreshTagsButton: React.FC<RefreshTagsButtonProps> = ({ onRefresh, isLoading = false }) => {
  return (
    <button
      onClick={onRefresh}
      disabled={isLoading}
      className="flex items-center justify-center px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
      aria-label="Obter novos gêneros"
      title="Obter novos gêneros"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )}
      <span>Novos gêneros</span>
    </button>
  );
};

export default RefreshTagsButton;