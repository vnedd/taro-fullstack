"use client";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="w-44 h-44 relative">
        <img src={"/images/cart-empty.png"} alt="cart Empty" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold">Your cart is empty</h3>
        <p className="text-gray-500 text-sm mt-2">
          Looks like you have not added anything to your cart?. Go ahead &
          explore top categories
        </p>
      </div>
      <Link to={"/shop"}>
        <Button className="" variant={"default"}>
          Shopping Now
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
