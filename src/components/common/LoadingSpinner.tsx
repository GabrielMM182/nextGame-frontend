import React from 'react';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  fullScreen?: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  fullScreen = false
}) => {
  // Determinar classes baseadas no tamanho
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };
  
  // Determinar classes baseadas na cor
  const colorClasses = {
    primary: 'text-indigo-600 dark:text-indigo-400',
    secondary: 'text-purple-600 dark:text-purple-400',
    white: 'text-white'
  };
  
  const Spinner = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} ${colorClasses[color]}`}>
        <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div className={`${size === 'lg' ? 'mt-4' : 'mt-2'} text-center ${colorClasses[color]}`}>
        <div className="animate-pulse flex space-x-1 justify-center">
          <div className="h-1.5 w-1.5 bg-current rounded-full"></div>
          <div className="h-1.5 w-1.5 bg-current rounded-full animation-delay-200"></div>
          <div className="h-1.5 w-1.5 bg-current rounded-full animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
          <Spinner />
          <p className={`mt-4 font-medium ${colorClasses[color]}`}>Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center py-8">
      <Spinner />
    </div>
  );
};

export default LoadingSpinner;