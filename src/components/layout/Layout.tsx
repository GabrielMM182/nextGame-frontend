import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useAuthApi } from '../../hooks/useAuthApi';
import GameControlThemeToggle from '../ui/GameControlThemeToggle';

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
            <nav className="flex items-center">
              <ul className="flex items-center space-x-6">
                <li>
                  <Link to="/" className="text-indigo-100 hover:text-white">
                    Home
                  </Link>
                </li>
                
                <li>
                  <Link to="/game" className="text-indigo-100 hover:text-white">
                    Jogos
                  </Link>
                </li>
                
                {isAuthenticated && (
                  <li>
                    <Link to="/history" className="text-indigo-100 hover:text-white">
                      Histórico
                    </Link>
                  </li>
                )}
                
                <li>
                  <Link to="/about" className="text-indigo-100 hover:text-white">
                    Sobre
                  </Link>
                </li>
                
                <li className="ml-2">
                  <GameControlThemeToggle />
                </li>
                
                {isAuthenticated ? (
                  <>
                    <li className="border-l pl-6 border-indigo-400">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white font-medium mr-2">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white text-sm">{user?.name}</p>
                          <p className="text-indigo-200 text-xs">{user?.nickname}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="bg-indigo-700 dark:bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-800 dark:hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Sair
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link 
                      to="/auth"
                      className="bg-white text-indigo-600 dark:bg-indigo-300 dark:text-indigo-800 px-4 py-2 rounded hover:bg-indigo-50 dark:hover:bg-indigo-200 transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="dark:text-gray-100 transition-colors duration-200">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-12 transition-colors duration-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} GameFinder. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacidade
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;