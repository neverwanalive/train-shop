import React from "react";
import { useBasket } from "../../store/basketStore";
import { Button } from "@heroui/button";
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { useAuth } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

interface BasketSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

type ItemWithName = {
  id: string;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  quantity: number;
};

export default function BasketSlider({ isOpen, onClose }: BasketSliderProps) {
  const { getCurrentUserBasket, removeItem, updateQuantity, getTotalPrice } =
    useBasket();
  const { username } = useAuth();
  const items = getCurrentUserBasket(username);
  const navigate = useNavigate();

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper to get item name
  const getItemName = (item: ItemWithName) => {
    return item.name || item.title || "Без названия";
  };

  const totalPrice = getTotalPrice(username);

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
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            Корзина
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-600">
                ({items.length})
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
        <div className="h-[calc(100vh-80px)] flex flex-col">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6">
              <div className="bg-gray-100 rounded-full p-8 mb-6">
                <ShoppingCart className="w-16 h-16 opacity-50" />
              </div>
              <p className="text-xl font-semibold mb-2">Корзина пуста</p>
              <p className="text-sm text-gray-500">Добавьте товары в корзину</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.map((item) => {
                  const itemName = getItemName(item);
                  return (
                    <div
                      key={item.id}
                      className="group relative flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
                    >
                      {/* Decorative gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-200 pointer-events-none" />

                      {/* Item Image */}
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
                        {/* Item Name */}
                        <h3 className="font-semibold text-base text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                          {itemName}
                        </h3>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {item.price !== undefined && (
                              <span className="text-lg font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            )}
                            {item.quantity > 1 && item.price !== undefined && (
                              <span className="text-xs text-gray-500">
                                ${item.price} × {item.quantity}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  username
                                )
                              }
                              className="min-w-0 w-7 h-7"
                              aria-label="Уменьшить количество"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-semibold w-6 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  username
                                )
                              }
                              className="min-w-0 w-7 h-7"
                              aria-label="Увеличить количество"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onClick={() => removeItem(item.id, username)}
                              className="min-w-0 w-7 h-7 text-red-500 hover:text-red-700"
                              aria-label="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer with Total */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Итого:
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-3"
                  onClick={() => {
                    onClose(); // Close the slider first
                    navigate("/checkout"); // Navigate to checkout
                  }}
                >
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
