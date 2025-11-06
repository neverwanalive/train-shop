import React from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div id="main">
      <Header />
      <div
        id="main"
        className="bg-[url('/pictures/77.png')] bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-end min-h-screen pb-16"
      >
        <Button
          disableRipple
          className="pl-16 pr-16 pb-4 pt-4 bg-white border-1 border-black cursor-pointer transition-all duration-300 ease-out 
                hover:bg-black hover:text-white hover:border-white"
          onClick={() => navigate("/catalog")}
        >
          В КАТАЛОГ
        </Button>
      </div>
      <Footer />
    </div>
  );
};
