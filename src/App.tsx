import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import GameDetailsPage from './pages/GameDetailsPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import HistoryPage from './pages/HistoryPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  // Aplicar o tema ao elemento HTML root quando o tema mudar
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Adicionando uma classe especial para AuthPage
    const isAuthPage = window.location.pathname === '/auth';
    if (isAuthPage) {
      root.classList.add('auth-page');
    } else {
      root.classList.remove('auth-page');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de autenticação - fixada no tema claro */}
        <Route 
          path="/auth" 
          element={
            <div className="light">
              {isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />}
            </div>
          } 
        />

        {/* Layout principal */}
        <Route path="/" element={<Layout />}>
          {/* Rota pública - página inicial */}
          <Route index element={<LandingPage />} />
          
          {/* Rota pública - sobre o projeto */}
          <Route path="about" element={<AboutPage />} />
          
          {/* Rotas protegidas que requerem autenticação */}
          <Route element={<ProtectedRoute />}>
            <Route path="game" element={<GamePage />} />
            <Route path="game/:id" element={<GameDetailsPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;