export interface GameTag {
  id: string;
  name: string;
}

export interface GameSearchRequest {
  tags: string[];
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface GameSummary {
  background_image: any;
  id: string;
  title: string;
  description: string;
}

export interface GameSearchResponse {
  name: string;
  searchId: string;
  summary: GameSummary[];
  gameDetails?: GameDetailsFromApi;
}

// Interface que reflete a estrutura de dados vinda da API do backend
export interface GameDetailsFromApi {
  name: string;
  rawgId?: string;
  summary?: any;
  releaseYear: number | null;
  platforms: Platform[];
  images: string[];
  boxArt?: string;
}

// Interface para uso interno na aplicação
export interface GameDetails {
  id: string;
  name: string;
  released: string;
  background_image: string;
  description: string;
  platforms: string[];
  genres: string[];
  metacritic: number | null;
  screenshots: string[];
}