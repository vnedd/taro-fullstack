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

type PaymentStatusProps = {
  paymentStatus: string;
};

const PaymentStatus = ({ paymentStatus }: PaymentStatusProps) => {
  let badgeVariant: BadgePropsType = "pending";

  if (paymentStatus === "Unpaid") {
    badgeVariant = "pending";
  }
  if (paymentStatus === "Paid") {
    badgeVariant = "success";
  }
  if (paymentStatus === "Refunded") {
    badgeVariant = "destructive";
  }
  return (
    <Badge variant={badgeVariant}>
      <span className="w-1 h-1 rounded-full bg-white mr-1"></span>
      <span>{paymentStatus}</span>
    </Badge>
  );
};

export default PaymentStatus;
