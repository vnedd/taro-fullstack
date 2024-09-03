import { useEffect } from "react";
import Congratulation from "./congratulation";
import OrderDetails from "./order-details";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/use-cart";
import { IOrder } from "@/types/order";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface SuccessContentProps {
  order: IOrder;
}

const SuccessContent = ({ order }: SuccessContentProps) => {
  const { onOpen } = useConfettiStore();
  const { removeAllItems } = useCart();

  useEffect(() => {
    onOpen();
    removeAllItems();
    toast.success("Place Order Successully");
  }, [removeAllItems, onOpen]);

  return (
    <div className="lg:px-60">
      <Congratulation date={order.createdAt} />
      <OrderDetails order={order} />
    </div>
  );
};

export default SuccessContent;
