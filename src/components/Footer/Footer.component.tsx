import React from "react";

export const Footer: React.FC = () => {
  return (
    <div id="footer" className="bg-gray-300 font-medium">
      <div id="up" className="flex border-b justify-start">
        <div id="1" className="border-black-300  p-6 gap-2 flex-col flex w-1/3">
          <div className="pb-2 text-xl">ПОДРОБНЕЕ</div>
          <div>ГЛАВНАЯ</div>
          <div>ГАЛЕРЕЯ</div>
        </div>
        <div
          id="2"
          className="border-black-300 border-l p-6 gap-2 flex-col flex w-1/3"
        >
          <div className="pb-2 text-xl">ПОКУПАТЕЛЮ</div>
          <div>ОФЕРТА</div>
          <div>ОТЗЫВЫ</div>
          <div>ПОЛИТИКА ПРИВАТНОСТИ</div>
          <div>ЗАЯВЛЕНИЕ НА ВОЗВРАТ ТОВАРА</div>
          <div>УСЛОВИЯ ДОСТАВКИ</div>
        </div>
        <div id="3" className="p-6 border-l gap-2 flex-col flex w-1/3">
          <div className="pb-2 text-xl">КОНТАКТЫ И ПОЧТА</div>
          <div>TELEGRAM</div>
          <div>INSTAGRAM</div>
          <div>TIKTOK</div>
          <div>VK</div>
          <div>KUSAKABEQWE@GMAIL.COM</div>
        </div>
      </div>
      <div id="bot" className="flex justify-center p-1">
        KUSAKABE 2024
      </div>
    </div>
  );
};
