import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Section 1: Подробнее */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-200">
              ПОДРОБНЕЕ
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="/"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                ГЛАВНАЯ
              </a>
              <a
                href="/catalog"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                ГАЛЕРЕЯ
              </a>
            </nav>
          </div>

          {/* Section 2: Покупателю */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-200">
              ПОКУПАТЕЛЮ
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                ОФЕРТА
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                ОТЗЫВЫ
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                ПОЛИТИКА ПРИВАТНОСТИ
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                ЗАЯВЛЕНИЕ НА ВОЗВРАТ ТОВАРА
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                УСЛОВИЯ ДОСТАВКИ
              </a>
            </nav>
          </div>

          {/* Section 3: Контакты */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-200">
              КОНТАКТЫ И ПОЧТА
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                TELEGRAM
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                INSTAGRAM
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                TIKTOK
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                VK
              </a>
              <a
                href="mailto:kusakabeqwe@gmail.com"
                className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                KUSAKABEQWE@GMAIL.COM
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-500">
            © KUSAKABE 2024
          </div>
        </div>
      </div>
    </footer>
  );
};
