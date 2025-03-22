import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LandingPage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center mb-20">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Descubra seu próximo jogo favorito
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8">
            Use inteligência artificial para encontrar jogos baseados nos seus gêneros preferidos. 
            Uma experiência personalizada de recomendação de jogos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/game" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow-md"
            >
              Encontrar Jogos
            </Link>
            {!isAuthenticated && (
              <Link 
                to="/auth" 
                className="bg-white dark:bg-gray-800 border border-indigo-600 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
              >
                Criar Conta
              </Link>
            )}
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-3 shadow-xl">
            <img 
              src="/hero-image.jpg" 
              alt="Collage de jogos diversos" 
              className="rounded-lg w-full h-auto object-cover"
              onError={(e) => {
                // Fallback para div com texto em vez de imagem placeholder externa
                const target = e.currentTarget;
                const parent = target.parentNode;
                if (parent) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'w-full h-64 flex items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg';
                  const textSpan = document.createElement('span');
                  textSpan.className = 'text-white text-xl font-semibold';
                  textSpan.textContent = 'GameFinder';
                  fallbackDiv.appendChild(textSpan);
                  parent.replaceChild(fallbackDiv, target);
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Recomendações Inteligentes</h3>
          <p className="text-gray-600 dark:text-gray-300">Nosso algoritmo analisa suas preferências e encontra jogos que realmente combinam com seu estilo.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Histórico Seguro</h3>
          <p className="text-gray-600 dark:text-gray-300">Mantenha um histórico das suas buscas e jogos favoritos em sua conta pessoal.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Dados Detalhados</h3>
          <p className="text-gray-600 dark:text-gray-300">Acesse informações completas sobre cada jogo, incluindo avaliações, plataformas e screenshots.</p>
        </div>
      </section>
      
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl p-10 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Encontre jogos que combinam com você</h2>
          <p className="text-indigo-100">Nossa plataforma conecta você aos melhores jogos baseados nas suas preferências</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">10.000+</p>
            <p className="text-indigo-100">Jogos analisados</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">93%</p>
            <p className="text-indigo-100">Taxa de acerto nas recomendações</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">Todas</p>
            <p className="text-indigo-100">Plataformas disponíveis</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Pronto para descobrir seu próximo jogo?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Não perca mais tempo procurando por jogos que combinam com seu estilo. 
          Nossa ferramenta torna a busca rápida e certeira!
        </p>
        <Link 
          to="/game" 
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-indigo-700 shadow-md text-lg inline-block"
        >
          Começar Agora
        </Link>
      </section>
    </div>
  );
};

export default LandingPage; 