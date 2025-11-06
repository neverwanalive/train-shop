import React from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      id="header"
      className="w-full flex justify-between border-b border-black-300"
    >
      <Button disableRipple id="fav" className="cursor-pointer m-4">
        <img src="/icons/favourite.png" className="size-[32px]" />
      </Button>
      <div
        id="name"
        className="m-4 font-bold text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        KUSAKABE
      </div>
      <div className="">
        <Button disableRipple id="basket" className="cursor-pointer">
          <img src="/icons/basket.png" className="size-[32px]" />
        </Button>
        <Button disableRipple id="profile" className="cursor-pointer m-4">
          <img src="/icons/profile.png" className="size-[32px]" />
        </Button>
      </div>
    </div>
  );
};
