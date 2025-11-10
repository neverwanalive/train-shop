import { useBasket } from "../../store/basketStore";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../store/authStore";

interface BasketButtonProps {
  item: { id: string; name: string; price?: number; image?: string };
  className?: string;
}

export default function BasketButton({ item, className }: BasketButtonProps) {
  const { addItem, removeItem, getCurrentUserBasket } = useBasket();
  const { username } = useAuth();
  const items = getCurrentUserBasket(username);
  const isInBasket = items.some((i) => i.id === item.id);

  const handleToggleBasket = () => {
    if (isInBasket) {
      removeItem(item.id, username);
    } else {
      addItem(item, username);
    }
  };

  return (
    <button
      onClick={handleToggleBasket}
      className={`
        group relative p-2 rounded-full transition-all duration-200
        hover:scale-110 active:scale-95
        ${
          isInBasket
            ? "text-blue-600 bg-blue-50"
            : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
        }
        ${className || ""}
      `}
      aria-label={isInBasket ? "Убрать из корзины" : "Добавить в корзину"}
    >
      <ShoppingCart
        className={`
          w-6 h-6 transition-all duration-300
          ${isInBasket ? "fill-blue-600 scale-100" : "fill-none scale-90"}
          ${isInBasket ? "" : "group-hover:fill-current"}
        `}
      />
    </button>
  );
}
