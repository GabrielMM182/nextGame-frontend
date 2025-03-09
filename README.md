
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

## Objetivo
Desenvolvimento de um frontend moderno em React para uma plataforma de recomendação de jogos, integrando com um backend existente que utiliza OpenAI para gerar recomendações e RAWG API para detalhes dos jogos.

## Tecnologias Utilizadas
- **Framework**: React com TypeScript
- **Bundler**: Vite
- **Gerenciamento de Estado**: Zustand
- **Chamadas API**: Axios
- **Cache e Async**: React Query
- **Estilização**: TailwindCSS
- **Roteamento**: React Router

## Estrutura de Diretórios
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
│   └── api/              # Configuração do Axios
├── store/                # Gerenciamento de estado com Zustand
├── types/                # Definições de tipos TypeScript
├── utils/                # Funções utilitárias
├── App.tsx               # Componente principal
├── main.tsx              # Ponto de entrada
└── vite-env.d.ts         # Tipos do Vite
```

## Componentes Principais

### Páginas
1. **HomePage**: Tela inicial com seletor até de 6 tags e exibição de resultados de busca
2. **GameDetailsPage**: Página detalhada de um jogo específico, Exibição de informações como título, descrição, plataformas, gêneros e Galeria de screenshots do jogo

### Componentes de Layout
- **Layout**: Estrutura base com header, footer e container para conteúdo via Outlet

### Componentes de Features
- **TagSelector**: Interface para selecionar tags/gêneros de jogos
- **SearchResults**: Exibe os resultados de busca de jogos recomendados

### Componentes Comuns
- **LoadingSpinner**: Feedback de Indicador de carregamento
- **ErrorMessage**: Componente para exibição de erros

## Custom Hooks
- **useGameApi**: Hook principal que encapsula toda a lógica de comunicação com a API:
  - `useTags()`: Para buscar tags/gêneros disponíveis
  - `useGameDetails()`: Para detalhes de um jogo específico
  - `useSearchResults()`: Para resultados de busca
  - `useSearchGames()`: Mutação para realizar busca

## Estado Global (Zustand)
- Tags selecionadas pelo usuário
- ID da busca atual
- Funções para adicionar/remover tags

## Integração com Backend
- Integração via Axios configurado para acessar `http://localhost:3000`
- Uso de React Query para cache eficiente e estados de loading/error

## Fluxo de Uso
1. Usuário seleciona até 6 tags/gêneros de jogos
2. Ao clicar em buscar, os gêneros são enviados para o backend
3. Backend consulta OpenAI e RAWG API, retorna ID da busca
4. Frontend exibe resultados baseados neste ID
5. Usuário pode clicar em um jogo para ver detalhes completos

## Aspectos Técnicos Importantes
- Tipagem forte com TypeScript para segurança de dados
- Tratamento centralizado de erros e estados de loading
- Componentes reutilizáveis e modularizados
- Custom hooks para encapsular lógica de negócio
- Design responsivo com TailwindCSS

## Decisões Arquiteturais
- Separação de responsabilidades com services e hooks
- Estado distribuído entre React Query (server state) e Zustand (client state)
- Layout consistente via React Router e componente Layout
- Encapsulamento da lógica de API em custom hooks para reuso e testabilidade

Essa arquitetura fornece uma base sólida, escalável e de fácil manutenção para a plataforma de recomendação de jogos, além de oferecer uma experiência de usuário fluida e responsiva.


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
