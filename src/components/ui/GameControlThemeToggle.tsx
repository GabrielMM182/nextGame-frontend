import { useThemeStore } from '../../store/useThemeStore';
import { useState, useEffect } from 'react';

export const GameControlThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Necessário para evitar problemas de hidratação (hydration mismatch) com SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none ${
        isAnimating ? 'scale-110' : 'scale-100'
      } ${
        theme === 'light' 
          ? 'bg-indigo-100 hover:bg-indigo-200' 
          : 'bg-indigo-900 hover:bg-indigo-800'
      }`}
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {theme === 'light' ? (
        // Controle Escuro
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5 text-indigo-800"
        >
          <rect x="5" y="2" width="14" height="20" rx="7" ry="7"></rect>
          <circle cx="12" cy="14" r="2"></circle>
          <path d="M12 7h.01"></path>
          <path d="M9 10h6"></path>
        </svg>
      ) : (
        // Controle Claro
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5 text-white"
        >
          <rect x="5" y="2" width="14" height="20" rx="7" ry="7"></rect>
          <circle cx="12" cy="14" r="2"></circle>
          <path d="M12 7h.01"></path>
          <path d="M9 10h6"></path>
        </svg>
      )}
    </button>
  );
};

export default GameControlThemeToggle; 