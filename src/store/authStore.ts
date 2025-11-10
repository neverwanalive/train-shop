import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  username: string | null;
  userId: string | null;
  setAuth: (token: string, username: string, userId?: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      userId: null,
      setAuth: (token, username, userId) => {
        const currentUserId = userId || username;
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUserId", currentUserId);
        set({ token, username, userId: currentUserId });
      },
      clearAuth: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUserId");
        set({ token: null, username: null, userId: null });
      },
      isAuthenticated: () => {
        const token = get().token || localStorage.getItem("authToken");
        return !!token;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
