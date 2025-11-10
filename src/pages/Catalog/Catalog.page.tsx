import React from "react";
import { Header } from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/sdk.gen";
import type { Product } from "../../api/types.gen";
import { Footer } from "../../components/Footer";
import FavoriteButton from "../../components/Fav/FavButton";
import BasketButton from "../../components/Basket/BasketButton";

export const Catalog: React.FC = () => {
  // 1. Чтение списка
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"], // уникальный ключ
    queryFn: () => getAllProducts(), // функция-запрос
    select: (res) => res.data, // берём data из axios
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-lg text-gray-600">Загружаем...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-red-600">
            Ошибка: {(error as Error).message}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {/* Favorite Button - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton
                    item={{
                      id: String(product.id ?? ""),
                      name: product.title ?? "",
                      price: product.price,
                      image: product.image,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-4 gap-3">
                {/* Title */}
                <h3 className="font-semibold text-base text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                  {product.title}
                </h3>

                {/* Price and Basket Button */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <BasketButton
                    item={{
                      id: String(product.id ?? ""),
                      name: product.title ?? "",
                      price: product.price,
                      image: product.image,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
