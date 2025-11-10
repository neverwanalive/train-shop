import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteItem {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

interface UserFavorites {
  [userId: string]: FavoriteItem[];
}

interface FavoritesState {
  userFavorites: UserFavorites;
  getCurrentUserFavorites: () => FavoriteItem[];
  toggleFavorite: (item: FavoriteItem, userId: string | null) => void;
  isFavorite: (id: string, userId: string | null) => boolean;
  clearFavorites: (userId: string) => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      userFavorites: {},
      getCurrentUserFavorites: () => {
        const userId = localStorage.getItem("currentUserId") || "guest";
        return get().userFavorites[userId] || [];
      },
      toggleFavorite: (item, userId) => {
        const currentUserId =
          userId || localStorage.getItem("currentUserId") || "guest";
        set((state) => {
          const userFavs = state.userFavorites[currentUserId] || [];
          const exists = userFavs.some((f) => f.id === item.id);

          const newUserFavorites = {
            ...state.userFavorites,
            [currentUserId]: exists
              ? userFavs.filter((f) => f.id !== item.id)
              : [...userFavs, item],
          };

          return { userFavorites: newUserFavorites };
        });
      },
      isFavorite: (id, userId) => {
        const currentUserId =
          userId || localStorage.getItem("currentUserId") || "guest";
        const userFavs = get().userFavorites[currentUserId] || [];
        return userFavs.some((f) => f.id === id);
      },
      clearFavorites: (userId) => {
        set((state) => {
          const newUserFavorites = { ...state.userFavorites };
          delete newUserFavorites[userId];
          return { userFavorites: newUserFavorites };
        });
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
