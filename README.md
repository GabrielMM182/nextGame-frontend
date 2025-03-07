
# Resumo do Projeto Frontend para Plataforma de Recomendação de Jogos

## Configuração inicial

```
npm create vite@latest game-recommendation-app -- --template react-ts
cd game-recommendation-app
```
# Dependências principais
```
npm install react-router-dom axios @tanstack/react-query zustand
````

# Dependências de desenvolvimento
```
npm install -D tailwindcss postcss autoprefixer
```

// deve estar abaixo da versao 4 para funcionar
```
npx tailwindcss init -p
````

Edite o arquivo tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Adicione as diretivas do Tailwind ao seu arquivo CSS principal (src/index.css):

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Estrutura e Tecnologias

Desenvolvemos um frontend em React para uma plataforma de recomendação de jogos que consome uma API existente rodando em `localhost:3000`. As principais tecnologias utilizadas são:

- React com TypeScript
- Vite como bundler
- Zustand para gerenciamento de estado
- React Query para gerenciamento de dados assíncronos
- Axios para requisições HTTP
- TailwindCSS para estilização

## Estrutura de Diretórios

Organizamos o projeto usando uma arquitetura modular e escalável:
```
src/
├── assets/              # Recursos estáticos
├── components/          # Componentes React organizados por finalidade
├── hooks/               # Hooks personalizados
├── pages/               # Páginas da aplicação
├── services/            # Serviços e integrações com API
├── store/               # Estados globais (Zustand)
├── types/               # Definições de tipos TypeScript
├── utils/               # Funções utilitárias
```
-----------------------------------------------

```
src/
├── assets/               # Recursos estáticos (imagens, fontes)
├── components/           # Componentes reutilizáveis
│   ├── common/           # Componentes de UI genéricos
│   ├── layout/           # Componentes de layout
│   └── features/         # Componentes específicos de funcionalidades
├── hooks/                # Custom hooks
├── pages/                # Páginas/rotas da aplicação
├── services/             # Serviços e integrações com APIs
│   └── api/              # Configuração do Axios e endpoints
├── store/                # Gerenciamento de estado com Zustand
├── types/                # Definições de tipos TypeScript
├── utils/                # Funções utilitárias
├── App.tsx               # Componente principal
├── main.tsx              # Ponto de entrada
└── vite-env.d.ts         # Tipos do Vite
```



## Funcionalidades Implementadas

1. **Página Inicial (HomePage)**
   - Seleção de até 6 tags/gêneros de jogos
   - Busca de recomendações baseada nas tags selecionadas
   - Exibição dos resultados da busca

2. **Página de Detalhes (GameDetailsPage)**
   - Visualização detalhada de um jogo específico
   - Exibição de informações como título, descrição, plataformas, gêneros
   - Galeria de screenshots do jogo

3. **Componentes Reutilizáveis**
   - TagSelector: Gerencia a seleção de tags/gêneros
   - SearchResults: Exibe os resultados de busca
   - LoadingSpinner: Feedback de carregamento
   - ErrorMessage: Tratamento de erros visuais

## Integração com o Backend

- Configuramos o Axios para se comunicar com a API em `localhost:3000`
- Criamos um serviço para encapsular as chamadas à API:
  - `getTags()`: Obtém tags aleatórias de gêneros de jogos
  - `searchGames()`: Envia tags para busca de recomendações
  - `getGameDetails()`: Obtém detalhes completos de um jogo específico

- Implementamos o React Query para cache eficiente e gerenciamento de estado das requisições

## Gerenciamento de Estado

Utilizamos Zustand para gerenciar o estado global da aplicação, especificamente:
- Tags/gêneros selecionados pelo usuário
- ID da busca atual para carregamento de resultados
- Funções para adicionar/remover tags e gerenciar o processo de busca

## Boas Práticas Implementadas

1. **Tipagem forte com TypeScript** para todos os componentes e funções
2. **Componentização** para reuso e manutenção facilitada
3. **Tratamento de erros** consistente com feedback visual
4. **Feedback de carregamento** para melhorar a experiência do usuário
5. **Proxies no Vite** para resolver questões de CORS
6. **Design responsivo** com TailwindCSS

Os componentes foram projetados para serem declarativos, reutilizáveis e fáceis de manter, seguindo os princípios de Single Responsibility e separação de responsabilidades.

### How to Use:
1. Save the file as `install-deps.ts` and make it executable:  
   ```sh
   chmod +x install-deps.js
   ```
2. Run the script in your project directory:  
   ```sh
   node install-deps.js
   ```
   or, if globally installed:
   ```sh
   ./install-deps.js
   ```
3. Use `--dev` if you only want to install dev dependencies:  
   ```sh
   node install-deps.js --dev
   ```
