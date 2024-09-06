import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBlock from "@/components/error-block";
import Container from "@/components/container";
import useScrollToTop from "@/hooks/use-scroll-to-top";
import Loading from "@/components/loading";
import { useOrder } from "@/hooks/use-orders";
import OrderHeader from "./_components/order-header";
import { cn } from "@/lib/utils";
import { EOrderStates } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import OrderTotal from "@/components/order/order-total";
import OrderActions from "./_components/order-actions";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  useScrollToTop();
  useEffect(() => {
    if (!orderId) navigate("/");
  }, [orderId, navigate]);

  const { data: order, isLoading, isError } = useOrder(orderId!);

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (isError || !order) {
    return <ErrorBlock />;
  }

  const isCancelled = order.orderState === EOrderStates.Cancelled;

  return (
    <div>
      <OrderHeader order={order} />
      <div className={cn("grid md:grid-cols-5 grid-cols-1 gap-6 mt-6")}>
        <div
          className={cn(
            "col-span-full space-y-6",
            isCancelled ? "md:col-span-5" : "md:col-span-3 "
          )}
        >
          <Card>
            <CardContent className="mt-4">
              <OrderTotal order={order} />
            </CardContent>
          </Card>
        </div>
        {!isCancelled && (
          <div className="md:col-span-2 col-span-full">
            <OrderActions order={order} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
