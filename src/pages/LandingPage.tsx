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
                e.currentTarget.src = 'https://via.placeholder.com/600x400?text=GameFinder';
              }}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Selecione seus gêneros</h3>
            <p className="text-gray-600 dark:text-gray-300">Escolha até 6 gêneros de jogos que mais te interessam para personalizar suas recomendações.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Nossa IA analisa</h3>
            <p className="text-gray-600 dark:text-gray-300">Nosso algoritmo processa sua seleção e encontra o jogo perfeito com base nas suas preferências.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Descubra jogos</h3>
            <p className="text-gray-600 dark:text-gray-300">Receba recomendações personalizadas e detalhes completos sobre jogos que você vai adorar.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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