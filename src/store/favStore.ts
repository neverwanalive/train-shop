import { create } from "zustand";

interface FavoriteItem {
  id: string;
  name: string;
  price?: number;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  favorites: [],
  toggleFavorite: (item) =>
    set((state) => {
      const exists = state.favorites.some((f) => f.id === item.id);
      if (exists) {
        return { favorites: state.favorites.filter((f) => f.id !== item.id) };
      } else {
        return { favorites: [...state.favorites, item] };
      }
    }),
  isFavorite: (id) => get().favorites.some((f) => f.id === id),
}));
