import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  try {
    // Tentar obter o token do storage direto (oculto)
    let token = localStorage.getItem('auth-storage-token');
    
    if (!token) {
      // Tentar obter do estado persistido
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        token = parsed?.state?.token;
      }
    }
    
    if (token) {
      // Garantir que o objeto headers exista
      config.headers = config.headers || {};
      // Definir o token de autorização
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token adicionado ao cabeçalho da requisição');
    } else {
      console.log('Token não encontrado para requisição');
    }
  } catch (error) {
    console.error('Erro ao processar token:', error);
  }
  
  return config;
});

// Interceptor para logar respostas
api.interceptors.response.use(
  (response) => {
    console.log(`Resposta da API (${response.config.url}):`, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`Erro na API (${error.config?.url}):`, error.response.status, error.response.data);
    } else {
      console.error('Erro na requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;