import { useCart } from "@/hooks/use-cart";
import useStore from "@/hooks/use-store";
import { cn, formatter } from "@/lib/utils";
import CartQuantity from "./cart-quantity";
import { ICartItem } from "@/types/cart";
import { Link } from "react-router-dom";

type CartItemProps = {
  item: ICartItem;

  hiddenQuantity?: boolean;
};

const CartItem = ({ item, hiddenQuantity }: CartItemProps) => {
  const cart = useStore(useCart, (state) => state);

  if (!cart) {
    return null;
  }

  return (
    <li className="md:py-6 py-2">
      <div className="flex md:gap-4 gap-3">
        <div className="md:h-28 md:w-28 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
          <img
            src={item.productImage}
            alt={item.productName}
            className="object-cover"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col-reverse md:flex-row justify-between text-base font-medium text-gray-900 dark:text-gray-50">
            <Link
              to={`/product/${item.productId}`}
              className="text-sm line-clamp-1 md:line-clamp-2 order-1 "
            >
              {item.productName}
            </Link>

            <p className="md:ml-4 ml-0 font-semibold md:text-lg text-sm order-2 md:order-3">
              {formatter.format(item.pricePerUnit!)}
            </p>
          </div>
          <div className="flex-col space-y-2">
            <div className="flex flex-col">
              <p className="mt-1 md:text-sm text-xs text-gray-500 dark:text-gray-200">
                Size:{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  {item.sizeName}
                </span>
              </p>
              <p className="mt-1 md:text-sm text-xs text-gray-500 dark:text-gray-200">
                Color:{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  {item.colorName}
                </span>
              </p>
              <p className="mt-1 md:text-sm text-xs text-gray-500 dark:text-gray-200">
                Style:{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300 text-nowrap">
                  {item.styleName}
                </span>
              </p>
              {hiddenQuantity && (
                <p className="mt-1 md:text-sm text-xs text-gray-500 dark:text-gray-200">
                  Quantity:{" "}
                  <span className="font-semibold text-sky-800 dark:text-sky-300 text-nowrap">
                    {item.quantity}
                  </span>
                </p>
              )}
            </div>
            <CartQuantity
              item={item}
              className={cn(hiddenQuantity && "hidden")}
            />
          </div>
        </div>
      </div>
      <div className={cn("flex md:mt-2 mt-1", hiddenQuantity && "hidden")}>
        <div
          onClick={() => cart.removeItem(item.id)}
          className="font-medium text-sky-700 dark:text-sky-300 hover:text-sky-600 cursor-pointer hover:underline text-sm"
        >
          Remove
        </div>
      </div>
    </li>
  );
};

export default CartItem;
