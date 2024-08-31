import { useMemo } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/container";
import { useCart } from "@/hooks/use-cart";
import useStore from "@/hooks/use-store";
import CartMenu from "@/components/cart/cart-list";
import CartEmpty from "@/components/cart/cart-empty";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";
import ServiceSection from "@/components/section/service-section";

const CartPage = () => {
  const cart = useStore(useCart, (s) => s);
  const cartTotal = useMemo(() => {
    return cart?.items.reduce((acc, cur) => {
      return acc + cur.pricePerUnit! * cur.quantity;
    }, 0);
  }, [cart?.items]);

  return (
    <>
      <Container className="lg:pt-28 pt-20">
        {cart?.items.length ? (
          <div>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-extrabold">Your Cart</h3>
              <Link to="/shop" className="underline text-sm font-medium">
                Continue shop
              </Link>
            </div>
            <Separator className="w-full my-6" />
            <div className="grid lg:grid-cols-6 grid-cols-1 gap-6">
              <div className="col-span-full lg:col-span-4  lg:border-r lg:pr-6">
                <CartMenu items={cart?.items} />
              </div>
              <div className="col-span-full lg:col-span-2 space-y-4 ">
                <div>
                  <h3 className="uppercase mb-1 text-sm">Enter promo code</h3>
                  <div className="flex flex-nowrap gap-4">
                    <Input placeholder="Promo code" />
                    <Button variant={"default"}>Apply</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium dark:text-gray-200 text-sm">
                      Subtotal
                    </p>
                    <p className="font-semibold">
                      {formatter.format(cartTotal!)}
                    </p>
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
                  <div className="flex justify-between ">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">
                      {formatter.format(cartTotal! + 5.99)}
                    </p>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button
                    className="w-full md:py-6 py-5 mt-4"
                    variant={"default"}
                  >
                    Checkout Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CartEmpty />
          </div>
        )}
      </Container>
      <div className="my-20">
        <ServiceSection />
      </div>
    </>
  );
};

export default CartPage;
