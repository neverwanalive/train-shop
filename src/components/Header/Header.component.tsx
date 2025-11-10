import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import FavoritesSlider from "../Fav/FavoritesSlider";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Favorites Button */}
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
              <Button
                disableRipple
                id="basket"
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Корзина"
              >
                <img src="/icons/basket.png" className="size-6" alt="Корзина" />
              </Button>
              <Button
                disableRipple
                id="profile"
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Профиль"
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
    </>
  );
};
