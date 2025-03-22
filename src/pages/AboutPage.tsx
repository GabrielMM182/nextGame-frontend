import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">Sobre o GameFinder</h1>
        
        {/* Missão */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400 text-center">Nossa Missão</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              O GameFinder foi criado com uma missão clara: ajudar jogadores a descobrirem 
              jogos que realmente combinem com seus gostos e preferências, economizando 
              tempo e eliminando a frustração de comprar jogos que acabam não agradando.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              Utilizamos inteligência artificial avançada e uma base de dados robusta 
              para oferecer recomendações personalizadas e precisas, conectando você 
              a experiências de jogo que realmente importam.
            </p>
          </div>
        </section>
        
        {/* Como funciona */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400 text-center">Como Funciona</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Tecnologia Inteligente</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Nossa plataforma utiliza algoritmos de inteligência artificial que analisam 
                milhares de jogos e suas características. Ao selecionar seus gêneros 
                preferidos, nosso sistema identifica padrões e encontra jogos que 
                correspondem às suas preferências específicas.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Dados Atualizados</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Integramos com as mais importantes bases de dados de jogos, incluindo a 
                RAWG, para garantir que nossas recomendações sejam baseadas em 
                informações completas e atualizadas sobre os títulos mais recentes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Experiência Personalizada</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Cada recomendação é única porque cada jogador é único. Nosso sistema aprende 
                com suas escolhas e histórico de busca para refinar continuamente suas 
                sugestões e torná-las cada vez mais precisas.
              </p>
            </div>
          </div>
        </section>
        
        {/* Benefícios */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400 text-center">Benefícios</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Economize Tempo</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Chega de passar horas navegando em lojas de jogos. 
                Receba recomendações personalizadas em segundos e 
                encontre seu próximo jogo favorito rapidamente.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Descubra Novos Jogos</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Conheça títulos que talvez não descobriria sozinho. 
                Nossa IA identifica jogos menos conhecidos que combinam 
                perfeitamente com seus interesses.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Acesso a Informações Detalhadas</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Obtenha informações completas sobre cada jogo: 
                plataformas disponíveis, classificações, requisitos, 
                screenshots e muito mais.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Experiências Personalizadas</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Nossa IA aprende com suas escolhas para melhorar 
                constantemente as recomendações, tornando cada visita 
                mais personalizada que a anterior.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-700 dark:text-gray-200 mb-6">
            Pronto para encontrar seu próximo jogo favorito?
          </p>
          <Link 
            to="/game" 
            className="inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 shadow-md"
          >
            Começar a Explorar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 