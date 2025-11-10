import React from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative bg-[url('/pictures/77.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="relative h-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Добро пожаловать в KUSAKABE
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-xl mx-auto">
              Откройте для себя уникальную коллекцию товаров
            </p>

            {/* CTA Button */}
            <div className="pt-4 flex justify-center">
              <Button
                disableRipple
                className="
                  px-10 py-5 
                  text-base md:text-lg 
                  font-bold 
                  tracking-wider
                  uppercase
                  bg-white 
                  text-black 
                  border-2 border-black 
                  rounded-none
                  cursor-pointer 
                  transition-all duration-300 ease-out 
                  hover:bg-black 
                  hover:text-white 
                  hover:border-white 
                  hover:scale-105 
                  hover:shadow-2xl
                  shadow-lg
                  active:scale-95
                  relative
                  overflow-hidden
                  group
                  flex
                  items-center
                  justify-center
                "
                onClick={() => navigate("/catalog")}
              >
                <span className="relative z-10">В КАТАЛОГ</span>
                <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
