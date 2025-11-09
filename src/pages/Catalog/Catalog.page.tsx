import React from "react";
import { Header } from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/sdk.gen";
import { Footer } from "../../components/Footer";
import FavoriteButton from "../../components/Fav/FavButton";
import { useFavorites } from "../../store/favStore";

export const Catalog: React.FC = () => {
  const { favorites } = useFavorites();
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
  if (isLoading) return <p>Загружаем...</p>;
  if (isError) return <p>Ошибка: {(error as any).message}</p>;
  console.log(favorites);
  return (
    <div>
      <Header />
      <div className="flex flex-wrap">
        {products?.map((post: any) => (
          <div
            key={post.id}
            className="w-1/4 border-b-1 border-r-1  flex flex-col items-center justify-center"
          >
            <img src={post.image} className="mt-4"></img>
            <div className="h-full flex flex-col items-center justify-end">
              <div>{post.title}</div>
              <div className="mb-4 ">{post.price}$</div>
              <FavoriteButton item={post} />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
