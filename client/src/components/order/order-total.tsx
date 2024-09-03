import { Separator } from "../ui/separator";
import { formatter } from "@/lib/utils";
import ShippingInfo from "./shipping-info";
import { IOrder } from "@/types/order";
import OrderProductItem from "./order-product-item";

type OrderTotalProps = {
  order: IOrder;
};

const OrderTotal = ({ order }: OrderTotalProps) => {
  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.pricePerUnit,
    0
  );
  return (
    <>
      <div className="flex flex-col gap-4">
        {order.orderItems.map((item) => (
          <OrderProductItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end px-4">
        <p className="font-light text-sm mt-3">
          Subtotal: {formatter.format(subtotal)}
        </p>
      </div>
      <Separator className="w-full my-3" />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="col-span-1 order-2 lg:order-first w-full">
          <ShippingInfo order={order} />
        </div>
        <div className="col-span-1  flex flex-col space-y-3 bg-slate-100 dark:bg-slate-800 p-4 rounded-md  w-full text-sm">
          <div className="flex justify-between">
            <p className="font-light">Discount</p>
            <p className="font-medium">{formatter.format(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-light">Tax</p>
            <p className="font-medium">{formatter.format(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-light">Payment processing fee</p>
            <p className="font-medium">{formatter.format(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-light">Shipping fee</p>
            <p className="font-medium">{formatter.format(5.99)}</p>
          </div>
          <Separator className="w-full my-2" />
          <div className="flex justify-between">
            <p className="font-light">Total</p>
            <p className="font-medium">{formatter.format(order.total)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTotal;
