import React from "react";
import { useFavorites } from "../../store/favStore";
import { Button } from "@heroui/button";
import { X, Heart, Image as ImageIcon } from "lucide-react";
import FavoriteButton from "./FavButton";

interface FavoritesSliderProps {
  isOpen: boolean;
  onClose: () => void;
}
type ItemWithName = {
  id: string;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
};

export default function FavoritesSlider({
  isOpen,
  onClose,
}: FavoritesSliderProps) {
  const { getCurrentUserFavorites } = useFavorites();
  const favorites = getCurrentUserFavorites();

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper to get item name (handles both 'name' and 'title' fields)
  const getItemName = (item: ItemWithName) => {
    return item.name || item.title || "Без названия";
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Slider Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            Избранное
            {favorites.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-600">
                ({favorites.length})
              </span>
            )}
          </h2>
          <Button
            isIconOnly
            variant="light"
            onClick={onClose}
            className="min-w-0 w-8 h-8 hover:bg-gray-100"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
              <div className="bg-gray-100 rounded-full p-8 mb-6">
                <Heart className="w-16 h-16 opacity-50" />
              </div>
              <p className="text-xl font-semibold mb-2">
                Нет избранных товаров
              </p>
              <p className="text-sm text-gray-500">
                Добавьте товары в избранное
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {favorites.map((item) => {
                const itemName = getItemName(item);
                return (
                  <div
                    key={item.id}
                    className="group relative flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {/* Decorative gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-pink-50/0 group-hover:from-red-50/50 group-hover:to-pink-50/50 transition-all duration-200 pointer-events-none" />

                    {/* Item Image - Smaller */}
                    <div className="relative flex-shrink-0">
                      {item.image ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={itemName}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      {/* Item Name - More prominent */}
                      <h3 className="font-semibold text-base text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                        {itemName}
                      </h3>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        {item.price !== undefined && (
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">
                              ${item.price}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FavoriteButton
                            item={item}
                            className="opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
