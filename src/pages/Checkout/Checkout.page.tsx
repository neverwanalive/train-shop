import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useBasket } from "../../store/basketStore";
import { useAuth } from "../../store/authStore";
import { ShoppingCart, MapPin, CreditCard, CheckCircle } from "lucide-react";

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentUserBasket, getTotalPrice, clearBasket } = useBasket();
  const { username, isAuthenticated } = useAuth();
  const items = getCurrentUserBasket(username);
  const totalPrice = getTotalPrice(username);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect if not authenticated or basket is empty
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth");
      return;
    }
    if (items.length === 0) {
      navigate("/catalog");
    }
  }, [isAuthenticated, items.length, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Order placed:", {
      items,
      totalPrice,
      formData,
      username,
    });

    // Clear basket after successful order
    if (username) {
      clearBasket(username);
    }

    setOrderPlaced(true);
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Заказ оформлен!
              </h1>
              <p className="text-gray-600">
                Спасибо за ваш заказ. Мы отправим подтверждение на{" "}
                {formData.email}
              </p>
            </div>
            <Button
              disableRipple
              onClick={() => navigate("/catalog")}
              className="
                px-8 py-3
                text-base
                font-semibold
                bg-black
                text-white
                border-2 border-black
                rounded-none
                hover:bg-gray-800
                transition-all duration-300
              "
            >
              Вернуться к покупкам
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Оформление заказа
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Адрес доставки
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        ФИО *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Телефон *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Город *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Адрес *
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Индекс *
                      </label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Страна *
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Способ оплаты
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Номер карты *
                      </label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Имя на карте *
                      </label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="cardExpiry"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Срок действия *
                        </label>
                        <input
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cardCVC"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          CVC *
                        </label>
                        <input
                          id="cardCVC"
                          name="cardCVC"
                          type="text"
                          placeholder="123"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Ваш заказ
                  </h2>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 pb-4 border-b border-gray-200 last:border-0"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Количество: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${((item.price ?? 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Подытог</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Итого</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disableRipple
                  onClick={handleSubmit}
                  disabled={isSubmitting || items.length === 0}
                  className="
                    w-full
                    px-8 py-3
                    text-base
                    font-semibold
                    bg-black
                    text-white
                    border-2 border-black
                    rounded-none
                    hover:bg-gray-800
                    transition-all duration-300
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting ? "Оформление..." : "Оформить заказ"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
