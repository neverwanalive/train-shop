// src/components/FavoriteButton.tsx
import { useFavorites } from "../../store/favStore";
import { Heart } from "lucide-react";
import { useAuth } from "../../store/authStore";

interface FavoriteButtonProps {
  item: { id: string; name: string; price?: number; image?: string };
  className?: string;
}

export default function FavoriteButton({
  item,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { username } = useAuth();
  const liked = isFavorite(item.id, username);

  return (
    <button
      onClick={() => toggleFavorite(item, username)}
      className={`
        group relative p-2 rounded-full transition-all duration-200
        hover:scale-110 active:scale-95
        ${liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}
        ${className || ""}
      `}
      aria-label={liked ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <Heart
        className={`
          w-6 h-6 transition-all duration-300
          ${liked ? "fill-red-500 scale-100" : "fill-none scale-90"}
          ${liked ? "" : "group-hover:fill-current"}
        `}
      />
      {liked && <span className=""></span>}
    </button>
  );
}
