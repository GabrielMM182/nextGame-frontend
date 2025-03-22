import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Perfil do Jogador
        </h1>
        
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <span className="text-3xl text-indigo-600 dark:text-indigo-300">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'J'}
            </span>
          </div>
        </div>
        
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
            {user?.name || 'Jogador'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.email || 'email@exemplo.com'}
          </p>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
            Página em Desenvolvimento
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Esta é uma página de teste para o perfil do jogador. Aqui serão exibidas informações sobre:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li>Histórico de jogos recomendados</li>
            <li>Gêneros favoritos</li>
            <li>Configurações de conta</li>
            <li>Estatísticas de uso da plataforma</li>
          </ul>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
            <p className="text-indigo-700 dark:text-indigo-300 text-sm">
              Em breve, novas funcionalidades serão adicionadas a esta página!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 