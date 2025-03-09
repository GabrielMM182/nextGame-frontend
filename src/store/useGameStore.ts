import { create } from 'zustand';
import { GameTag } from '../types/game';

interface GameState {
  selectedTags: GameTag[];
  searchId: string | null;
  addTag: (tag: GameTag) => void;
  removeTag: (tagId: string) => void;
  clearTags: () => void;
  setSearchId: (id: string | null) => void;
  // setSelectedTags: (tags: Tag[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  selectedTags: [],
  searchId: null,
  
  addTag: (tag) => set((state) => {
    // Limite de 6 tags
    if (state.selectedTags.length >= 6) return state;
    // Evita duplicação
    if (state.selectedTags.some(t => t.id === tag.id)) return state;
    return { selectedTags: [...state.selectedTags, tag] };
  }),
  
  removeTag: (tagId) => set((state) => ({
    selectedTags: state.selectedTags.filter(tag => tag.id !== tagId)
  })),
  
  clearTags: () => set({ selectedTags: [] }),
  
  setSearchId: (id) => set({ searchId: id }),
  // setSelectedTags: (tags) => set({ selectedTags: tags }),

}));