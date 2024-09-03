import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useDeleteOrder } from "@/hooks/use-orders";
import { useEffect } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const CheckoutCanceledPage = () => {
  const { orderId } = useParams();
  const deleteOrderMutation = useDeleteOrder();
  useEffect(() => {
    if (orderId) {
      deleteOrderMutation.mutate(orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <Container className="lg:pt-28 pt-20">
      <div className="w-full flex flex-col items-center space-y-6">
        <IoWarningOutline className="h-20 w-20 text-destructive opacity-40" />
        <h3 className="font-semibold text-2xl">Payment failed!</h3>
        <p className="text-muted-foreground max-w-md text-sm text-center">
          The payment was unsuccessful due to an abnormality. Please try again
          later or use another payment method.
        </p>
        <Link to="/checkout">
          <Button>Try Again</Button>
        </Link>
      </div>
    </Container>
  );
};

export default CheckoutCanceledPage;
