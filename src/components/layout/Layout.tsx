import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-white text-2xl font-bold">GameFinder</a>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="/" className="text-indigo-100 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-100 hover:text-white">
                    Histórico
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-100 hover:text-white">
                    Sobre
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} GameFinder. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Privacidade
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
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