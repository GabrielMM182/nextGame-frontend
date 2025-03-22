import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useAuthApi } from '../../hooks/useAuthApi';
import GameControlThemeToggle from '../ui/GameControlThemeToggle';
import ToastContainer from '../ui/ToastContainer';
import ThemeToggle from '../ui/ThemeToggle';

const Layout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { useLogout } = useAuthApi();
  const logout = useLogout();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-indigo-600 dark:bg-indigo-900 shadow-md transition-colors duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold">GameFinder</Link>
            
            <div className="flex items-center space-x-4">
              {/* <GameControlThemeToggle /> */}
              <ThemeToggle/>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/game" 
                    className="text-white hover:text-indigo-200 transition-colors"
                  >
                    Explorar
                  </Link>
                  
                  <Link 
                    to="/history" 
                    className="text-white hover:text-indigo-200 transition-colors"
                  >
                    Histórico
                  </Link>

                  <Link 
                    to="/about" 
                    className="text-white hover:text-indigo-200 transition-colors"
                  >
                    Sobre
                  </Link>
                  
                  <div className="relative group">
                    <button className="text-white hover:text-indigo-200 flex items-center transition-colors">
                      <span className="mr-1">{user?.name || 'Usuário'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-10 transition-all duration-200 transform scale-0 opacity-0 origin-top-right group-hover:scale-100 group-hover:opacity-100">
                      <div className="py-2">
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors"
                        >
                          Perfil
                        </Link>
                        
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors"
                        >
                          Sair
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="text-white hover:text-indigo-200 transition-colors"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <Outlet />
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-300">
                © 2023 GameFinder. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Sobre
              </Link>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Termos
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Toast global */}
      <ToastContainer />
    </div>
  );
};

export default Layout;