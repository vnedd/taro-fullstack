import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBlock from "@/components/error-block";
import Container from "@/components/container";
import useScrollToTop from "@/hooks/use-scroll-to-top";
import Loading from "@/components/loading";
import { useOrder } from "@/hooks/use-orders";
import OrderHeader from "./_components/order-header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderTotal from "@/components/order/order-total";
import OrderActions from "./_components/order-action";
import ShippingTimeline from "@/components/order/shipping-timeline";
import { EOrderStates } from "@/types/order";

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

  return (
    <div className="flex flex-col space-y-8">
      <OrderHeader order={order} />

      <Card>
        <CardContent className="mt-4">
          <OrderTotal order={order} />
          {order.orderState === EOrderStates.Unfulfilled ||
          order.orderState === EOrderStates.Cancelled ? (
            <div className="mt-8 text-muted-foreground">
              Waiting for shipment
            </div>
          ) : (
            <div className="mt-8">
              <ShippingTimeline order={order} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <OrderActions order={order} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
