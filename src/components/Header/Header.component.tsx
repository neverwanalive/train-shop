import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import FavoritesSlider from "../Fav/FavoritesSlider";
import BasketSlider from "../Basket/BasketSlider";
import { useBasket } from "../../store/basketStore";
import { useFavorites } from "../../store/favStore";
import { useAuth } from "../../store/authStore";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const { getItemCount } = useBasket();
  const { getCurrentUserFavorites } = useFavorites();
  const { username } = useAuth();
  const itemCount = getItemCount(username);
  const favorites = getCurrentUserFavorites();
  const favoritesCount = favorites.length;

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Favorites Button */}
            <div className="relative">
              <Button
                disableRipple
                id="fav"
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsFavoritesOpen(true)}
                aria-label="Избранное"
              >
                <img
                  src="/icons/favourite.png"
                  className="size-6"
                  alt="Избранное"
                />
              </Button>
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 transform translate-x-1/2 -translate-y-1/2 z-10">
                  {favoritesCount > 9 ? "9+" : favoritesCount}
                </span>
              )}
            </div>

            {/* Center: Logo/Brand */}
            <div
              id="name"
              className="font-bold text-2xl md:text-3xl cursor-pointer hover:text-red-600 transition-colors select-none"
              onClick={() => navigate("/")}
            >
              KUSAKABE
            </div>

            {/* Right: Basket and Profile */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  disableRipple
                  id="basket"
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsBasketOpen(true)}
                  aria-label="Корзина"
                >
                  <img
                    src="/icons/basket.png"
                    className="size-6"
                    alt="Корзина"
                  />
                </Button>
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 transform translate-x-1/2 -translate-y-1/2 z-10">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <Button
                disableRipple
                id="profile"
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Профиль"
                onClick={() => navigate("/auth")}
              >
                <img
                  src="/icons/profile.png"
                  className="size-6"
                  alt="Профиль"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <FavoritesSlider
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
      <BasketSlider
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
      />
    </>
  );
};
