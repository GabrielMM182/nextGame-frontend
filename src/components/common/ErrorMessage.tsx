import React from 'react';

type ErrorMessageProps = {
  message: string;
  retry?: () => void;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg px-6 py-8 max-w-md w-full shadow-md border border-red-100 dark:border-red-800">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 text-red-500 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Ops! Algo deu errado
          </h3>
          
          <p className="text-red-700 dark:text-red-200 mb-6">
            {message}
          </p>
          
          {retry && (
            <button
              onClick={retry}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              <span>Tentar novamente</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;