import { ICartItem } from "@/types/cart";
import CartItem from "./cart-item";

type CartMenuProps = {
  items: ICartItem[];
};

const CartMenu = ({ items }: CartMenuProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default CartMenu;
