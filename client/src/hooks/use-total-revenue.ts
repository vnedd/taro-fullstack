import { useOrders } from "@/hooks/use-orders";
import { EPaymentStates } from "@/types/order";
import { useMemo } from "react";

export const useTotalRevenue = () => {
  const { data: allOrders } = useOrders({
    get_all: true,
  });

  const totalRevenue = useMemo(() => {
    if (!allOrders) return 0;
    return allOrders.metaData
      .filter((item) => item.paymentState === EPaymentStates.Paid)
      .reduce((total, order) => total + order.total, 0);
  }, [allOrders]);

  return totalRevenue;
};
