import { ChangeEvent } from "react";
import { IoMdAdd } from "react-icons/io";
import { RxDividerHorizontal } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import useStore from "@/hooks/use-store";
import { ICartItem } from "@/types/cart";

type Props = {
  item: ICartItem;
  className?: string;
};

const CartQuantity = ({ item, className }: Props) => {
  const cart = useStore(useCart, (state) => state);

  if (!cart) {
    return null;
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value === 0) {
      cart.changeQuantityItem(item.id, 1);
    } else if (value > 50) {
      cart.changeQuantityItem(item.id, 50);
    } else {
      cart.changeQuantityItem(item.id, value);
    }
  };
  return (
    <div className={className}>
      <div className="relative flex items-center w-full space-x-3">
        <Button
          className="rounded-full h-6 w-6 text-lg shrink-0"
          size={"icon"}
          variant={"outline"}
          disabled={item.quantity === 1}
          onClick={() => cart.desceaseQuantityItem(item.id)}
        >
          <RxDividerHorizontal className="w-4 h-4" />
        </Button>
        <Input
          type="number"
          min={1}
          max={50}
          onChange={onChange}
          autoFocus={false}
          value={item.quantity}
          className="w-20"
        />
        <Button
          className="rounded-full h-6 w-6 text-lg shrink-0"
          size={"icon"}
          variant={"outline"}
          disabled={item.quantity === 50}
          onClick={() => cart.insceaseQuantityItem(item.id)}
        >
          <IoMdAdd className="w6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CartQuantity;
