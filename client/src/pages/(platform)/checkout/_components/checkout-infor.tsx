import { useMemo, useState } from "react";
import { formatter } from "@/lib/utils";
import useStore from "@/hooks/use-store";
import { useCart } from "@/hooks/use-cart";
import CartItem from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import CartEmpty from "@/components/cart/cart-empty";
const CheckoutInfor = () => {
  const [show, setShow] = useState(true);

  const cart = useStore(useCart, (s) => s);
  const cartTotal = useMemo(() => {
    return cart?.items.reduce((acc, cur) => {
      return acc + cur.pricePerUnit! * cur.quantity;
    }, 0);
  }, [cart?.items]);

  return (
    <div className="w-full lg:space-y-4 space-y-4">
      <div className="p-6 border rounded-md">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xl">
            Order Items({cart?.items.length})
          </h3>
          <Button
            variant={"link"}
            onClick={() => setShow(!show)}
            className="font-bold text-sky-800 dark:text-sky-600"
          >
            Show Items
          </Button>
        </div>
        {show && (
          <ul className="flex flex-col">
            {cart?.items.length ? (
              cart.items.map((item) => (
                <CartItem item={item} key={item.id} hiddenQuantity />
              ))
            ) : (
              <div>
                <CartEmpty />
              </div>
            )}
          </ul>
        )}
      </div>
      {cart?.items.length ? (
        <div className="p-6 border rounded-md">
          <h3 className="font-extrabold text-xl">Order Details</h3>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <p className="text-gray-700 font-medium dark:text-gray-200 text-sm">
                Subtotal
              </p>
              <p className="font-semibold">{formatter.format(cartTotal!)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700 font-medium dark:text-gray-200 text-sm">
                Discount
              </p>
              <p className="font-semibold">{formatter.format(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700 font-medium dark:text-gray-200 text-sm">
                Shipping
              </p>
              <p className="font-semibold">{formatter.format(5.99)}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p className="font-bold">Total</p>
              <p className="">{formatter.format(cartTotal! + 5.99)}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckoutInfor;
