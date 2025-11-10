import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BasketItem {
  id: string;
  name: string;
  price?: number;
  image?: string;
  quantity: number;
}

interface UserBaskets {
  [userId: string]: BasketItem[];
}

interface BasketState {
  userBaskets: UserBaskets;
  getCurrentUserBasket: (userId?: string | null) => BasketItem[];
  addItem: (item: Omit<BasketItem, "quantity">, userId?: string | null) => void;
  removeItem: (id: string, userId?: string | null) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    userId?: string | null
  ) => void;
  getTotalPrice: (userId?: string | null) => number;
  getItemCount: (userId?: string | null) => number;
  clearBasket: (userId: string) => void;
}

const getUserId = (userId?: string | null): string => {
  if (userId) return userId;
  return localStorage.getItem("currentUserId") || "guest";
};

export const useBasket = create<BasketState>()(
  persist(
    (set, get) => ({
      userBaskets: {},
      getCurrentUserBasket: (userId) => {
        const currentUserId = getUserId(userId);
        return get().userBaskets[currentUserId] || [];
      },
      addItem: (item, userId) => {
        const currentUserId = getUserId(userId);
        set((state) => {
          const userItems = state.userBaskets[currentUserId] || [];
          const existingItem = userItems.find((i) => i.id === item.id);

          const newUserBaskets = {
            ...state.userBaskets,
            [currentUserId]: existingItem
              ? userItems.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
              : [...userItems, { ...item, quantity: 1 }],
          };

          return { userBaskets: newUserBaskets };
        });
      },
      removeItem: (id, userId) => {
        const currentUserId = getUserId(userId);
        set((state) => {
          const userItems = state.userBaskets[currentUserId] || [];
          const newUserBaskets = {
            ...state.userBaskets,
            [currentUserId]: userItems.filter((i) => i.id !== id),
          };
          return { userBaskets: newUserBaskets };
        });
      },
      updateQuantity: (id, quantity, userId) => {
        const currentUserId = getUserId(userId);
        set((state) => {
          const userItems = state.userBaskets[currentUserId] || [];
          const newUserBaskets = {
            ...state.userBaskets,
            [currentUserId]:
              quantity <= 0
                ? userItems.filter((i) => i.id !== id)
                : userItems.map((i) => (i.id === id ? { ...i, quantity } : i)),
          };
          return { userBaskets: newUserBaskets };
        });
      },
      getTotalPrice: (userId) => {
        const currentUserId = getUserId(userId);
        const items = get().userBaskets[currentUserId] || [];
        return items.reduce(
          (total, item) => total + (item.price ?? 0) * item.quantity,
          0
        );
      },
      getItemCount: (userId) => {
        const currentUserId = getUserId(userId);
        const items = get().userBaskets[currentUserId] || [];
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      clearBasket: (userId) => {
        set((state) => {
          const newUserBaskets = { ...state.userBaskets };
          delete newUserBaskets[userId];
          return { userBaskets: newUserBaskets };
        });
      },
    }),
    {
      name: "basket-storage",
    }
  )
);
