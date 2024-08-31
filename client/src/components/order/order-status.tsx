import { Badge } from "../ui/badge";

type BadgePropsType =
  | "default"
  | "pending"
  | "process"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | null
  | undefined;

type OrderStatusProps = {
  orderStatus: string;
};

const OrderStatus = ({ orderStatus }: OrderStatusProps) => {
  let badgeVariant: BadgePropsType = "pending";

  if (orderStatus === "Shipping" || orderStatus === "Shipped") {
    badgeVariant = "process";
  }
  if (orderStatus === "Delivered") {
    badgeVariant = "success";
  }
  if (orderStatus === "Returned" || orderStatus === "Cancelled") {
    badgeVariant = "destructive";
  }
  return (
    <Badge variant={badgeVariant}>
      <span className="w-1 h-1 rounded-full bg-white mr-1"></span>
      <span>{orderStatus}</span>
    </Badge>
  );
};

export default OrderStatus;
