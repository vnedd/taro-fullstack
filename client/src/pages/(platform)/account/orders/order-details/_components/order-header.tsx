import { format } from "date-fns";
import { IoIosArrowBack } from "react-icons/io";

import PaymentStatus from "@/components/order/order-payment-status";
import OrderStatus from "@/components/order/order-status";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types/order";
import { Link } from "react-router-dom";

type OrderHeaderProps = {
  order: IOrder;
};

const OrderHeader = ({ order }: OrderHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap">
        <Link to={`/account/orders`}>
          <Button
            variant={"outline"}
            size={"icon"}
            className="md:w-10 md:h-10 w-8 h-8 "
          >
            <IoIosArrowBack className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h3 className="text-nowrap font-semibold md:text-lg text-xs">
            Order ID: <span className="uppercase">{order.id}</span>
          </h3>
          <p className="font-normal text-sm text-gray-500 dark:text-gray-300">
            Create date: {format(order.createdAt, "MMMM do, yyyy h:mm:ss a")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <OrderStatus orderStatus={order.orderState} />
          <PaymentStatus paymentStatus={order.paymentState} />
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
