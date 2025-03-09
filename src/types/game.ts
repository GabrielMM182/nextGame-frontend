export interface GameTag {
  id: string;
  name: string;
}

export interface GameSearchRequest {
  tags: string[];
}

export interface GameSummary {
  background_image: any;
  id: string;
  title: string;
  description: string;
}

export interface GameSearchResponse {
  name: any;
  searchId: string;
  summary: GameSummary[];
}

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