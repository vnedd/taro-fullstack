import OrderTotal from "@/components/order/order-total";
import { Card, CardContent } from "@/components/ui/card";
import { IOrder } from "@/types/order";

interface OrderDetailsProps {
  order: IOrder;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="mt-6 space-y-6">
      <h2 className="font-bold md:text-3xl text-xl text-center">
        Order details
      </h2>
      <Card>
        <CardContent className="md:pt-6">
          <OrderTotal order={order} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
