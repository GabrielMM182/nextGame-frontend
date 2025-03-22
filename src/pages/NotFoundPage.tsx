import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NotFoundPage = () => {
  const [currentJoke, setCurrentJoke] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const jogoNotFoundJokes = [
    "ERRO 404: O princess está em outro castelo!",
    "ERRO 404: Parece que seu mapa não tem essa localização desbloqueada ainda.",
    "ERRO 404: Checkpoint não encontrado. Tente voltar ao último save point!",
    "ERRO 404: Esse DLC não foi comprado ainda!",
    "ERRO 404: Essa fase ainda não foi lançada. Aguarde a próxima atualização!",
    "ERRO 404: Game Over! Página não encontrada. Inserir moeda para continuar?",
    "ERRO 404: Página não encontrada. Você precisa de uma chave especial para acessar esta área!",
    "ERRO 404: Wasted! A página que você procura foi eliminada.",
    "ERRO 404: Precisamos de mais construção de pilar de Zigurate!",
    "ERRO 404: Não foi possível encontrar a página. Talvez você precise de um nível mais alto para acessar esta área!"
  ];

  useEffect(() => {
    let timer: number | undefined;
    if (gameStarted && !gameOver) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timer) window.clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [gameStarted, gameOver]);

  const handleNextJoke = () => {
    if (gameStarted && !gameOver) {
      setScore((prev) => prev + 10);
      setCurrentJoke((prev) => (prev + 1) % jogoNotFoundJokes.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setCurrentJoke(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden text-center">
        <div className="p-8">
          <div className="w-24 h-24 mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-indigo-600 dark:text-indigo-400">
              <path d="M10.5 2H13.5C14.9045 2 15.6067 2 16.1111 2.33706C16.3295 2.48298 16.517 2.67048 16.6629 2.88886C17 3.39331 17 4.09554 17 5.5V6H19C19.9319 6 20.3978 6 20.7654 6.15224C21.2554 6.35523 21.6448 6.74458 21.8478 7.23463C22 7.60218 22 8.06812 22 9V16.5C22 17.9045 22 18.6067 21.6629 19.1111C21.517 19.3295 21.3295 19.517 21.1111 19.6629C20.6067 20 19.9045 20 18.5 20H5.5C4.09554 20 3.39331 20 2.88886 19.6629C2.67048 19.517 2.48298 19.3295 2.33706 19.1111C2 18.6067 2 17.9045 2 16.5V9C2 8.06812 2 7.60218 2.15224 7.23463C2.35523 6.74458 2.74458 6.35523 3.23463 6.15224C3.60218 6 4.06812 6 5 6H7V5.5C7 4.09554 7 3.39331 7.33706 2.88886C7.48298 2.67048 7.67048 2.48298 7.88886 2.33706C8.39331 2 9.09554 2 10.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 6V6.5C7 7.60457 7 8.15685 7.32698 8.5472C7.6146 8.89992 8.92593 9 10 9M17 6V6.5C17 7.60457 17 8.15685 16.673 8.5472C16.3854 8.89992 15.0741 9 14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 14H18.01M6 14H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">404</h1>
          <h2 className="text-xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
            Página não encontrada
          </h2>
          
          {gameStarted ? (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-indigo-700 dark:text-indigo-300">Score: {score}</span>
                <span className="font-medium text-red-600 dark:text-red-400">Tempo: {timeLeft}s</span>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">
                {jogoNotFoundJokes[currentJoke]}
              </p>
              <button 
                onClick={handleNextJoke}
                disabled={gameOver}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  gameOver 
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {gameOver ? "Game Over" : "Próxima Piada (+10pts)"}
              </button>
            </div>
          ) : (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-6">
              <p className="text-indigo-700 dark:text-indigo-300 text-lg mb-4">
                Parece que você se perdeu no mundo dos jogos!
              </p>
              {!gameStarted && !gameOver && (
                <button 
                  onClick={startGame}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Iniciar Mini-Game de Piadas
                </button>
              )}
            </div>
          )}
          
          {gameOver && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium mb-2">Game Over!</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Você conseguiu {score} pontos!</p>
              <button 
                onClick={startGame}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Jogar Novamente
              </button>
            </div>
          )}
          
          <div className="mt-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Voltando ao mundo real, a página que você procura não foi encontrada.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Voltar para a Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 