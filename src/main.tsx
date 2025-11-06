import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Catalog } from "./pages/Catalog";
import "./index.css";

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

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
