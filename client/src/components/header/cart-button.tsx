import { useStore } from "zustand";
import { forwardRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import CartEmpty from "@/components/cart/cart-empty";
import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import CartMenu from "@/components/cart/cart-list";
import CartSheet from "@/components/cart/cart-sheet";
import { useCartSheetStore } from "@/hooks/use-cart-sheet";
import { useAuthStore } from "@/store/auth";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

const CartButton = () => {
  const cart = useStore(useCart, (s) => s);
  const cartSheet = useStore(useCartSheetStore, (s) => s);
  const { isAuth } = useAuthStore();

  const cartTotal = useMemo(() => {
    return cart?.items.reduce((acc, cur) => {
      return acc + cur.pricePerUnit! * cur.quantity;
    }, 0);
  }, [cart?.items]);

  return (
    <>
      <div
        className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
        onClick={() => cartSheet.onOpen()}
      >
        <RiShoppingCartLine className="w-5 h-5 shrink-0 " />
        <Badge
          variant={"circle"}
          className="absolute w-4 h-4 rounded-full text-xs flex items-center justify-center top-0 right-0"
        >
          {cart?.items.length}
        </Badge>
      </div>
      <CartSheet
        open={cartSheet.isOpen}
        onClose={cartSheet.onClose}
        title={`Cart review (${cart.items.length})`}
      >
        {cart?.items.length ? (
          <div className="relative max-h-[100vh]">
            <div className="grid gap-4 md:py-4 py-2">
              <div className="md:max-h-[70vh] md:h-auto h-[60vh] min-h-[350px] pb-44 overflow-y-auto hidden-scrollbar">
                <CartMenu items={cart?.items} />
              </div>
            </div>
            <SheetFooter className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t md:pt-3 pt-2">
              <div className="w-full">
                <div className="flex justify-between font-semibold md:text-base text-sm">
                  <p>Subtotal</p>
                  <p>{formatter.format(cartTotal)}</p>
                </div>
                <p className="text-sm text-slate-400  font-light">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="grid grid-cols-1 md:gap-4 gap-2 mt-3">
                  <SheetClose asChild>
                    <Link to={"/cart"}>
                      <Button
                        variant={"outline"}
                        size={"default"}
                        className="rounded-md text-sm w-full"
                      >
                        Go To your Cart
                      </Button>
                    </Link>
                  </SheetClose>
                  {isAuth ? (
                    <SheetClose asChild>
                      <Link to={"/checkout"}>
                        <Button
                          variant={"default"}
                          size={"default"}
                          className="w-full rounded-md text-sm bg-sky-800 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-700 dark:hover:text-white hover:bg-sky-700"
                        >
                          Chekout Now
                        </Button>
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        className="rounded-md text-sm text-center hover:underline"
                        to={"/auth/login"}
                      >
                        Login to continue checkout!
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetFooter>
          </div>
        ) : (
          <CartEmpty />
        )}
      </CartSheet>
    </>
  );
};

export default forwardRef(CartButton);
