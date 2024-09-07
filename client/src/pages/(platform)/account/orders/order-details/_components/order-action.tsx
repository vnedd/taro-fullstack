import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { useCanceledOrder } from "@/hooks/use-orders";
import { EOrderStates, IOrder } from "@/types/order";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";

interface OrderActionsProps {
  order: IOrder;
}

const OrderActions = ({ order }: OrderActionsProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useCanceledOrder();

  const onCancel = async () => {
    try {
      await mutateAsync(order.id);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order cancelled successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Are you sure you want to cancel this order?"
        onConfirm={onCancel}
        description="This action cannot be undone, are you sure?"
      />
      <div className="flex items-center space-x-3">
        <Button
          disabled={
            isPending ||
            !!order.tracking?.code ||
            order.orderState === EOrderStates.Shipped ||
            order.orderState === EOrderStates.Cancelled ||
            order.orderState === EOrderStates.Delivered
          }
          variant={"destructive"}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          {isPending ? "Cancelling..." : "Cancel"}
          <MdOutlineCancel className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </>
  );
};

export default OrderActions;
