import { useThemeStore } from '../../store/useThemeStore';
import { useState, useEffect } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Necessário para evitar problemas de hidratação (hydration mismatch) com SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {theme === 'light' ? (
        // Ícone Lua (Modo Escuro)
        <div className="text-xl">🌙</div>
      ) : (
        // Ícone Sol (Modo Claro)
        <div className="text-xl">☀️</div>
      )}
    </button>
  );
};

export default ThemeToggle; 