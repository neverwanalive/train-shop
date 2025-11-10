import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Catalog } from "./pages/Catalog";
import { Auth } from "./pages/Auth";
import { Register } from "./pages/Register";
import { Checkout } from "./pages/Checkout";
import "./index.css";
import { useAuth } from "./store/authStore";
import { useEffect } from "react";

// Один клиент на всё приложение
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // сколько раз повторять при ошибке
      staleTime: 1000 * 60, // 1 минута кэша
      refetchOnWindowFocus: false,
    },
  },
});

// Add this component to initialize auth on app load
export function AuthInitializer() {
  const { username, setAuth } = useAuth();

  useEffect(() => {
    // If token exists but username is not set, restore from localStorage
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("currentUserId");

    if (storedToken && storedUserId && !username) {
      setAuth(storedToken, storedUserId, storedUserId);
    }
  }, [setAuth, username]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthInitializer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
