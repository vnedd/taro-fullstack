import { DataTable } from "@/components/ui/data-table";
import { columns, OrderColumn } from "./column";
import { IOrder } from "@/types/order";
import { format } from "date-fns";

interface OrderClientsProps {
  data: IOrder[];
}

const OrderClients: React.FC<OrderClientsProps> = ({ data }) => {
  const formattedOrders: OrderColumn[] = data.map((item: IOrder) => {
    return {
      id: item.id,
      paymentState: item.paymentState,
      items: item.orderItems,
      orderId: item.id,
      total: item.total,
      customerName: item.customerName,
      trackingCode: item?.tracking?.code || "",
      orderStatus: item.orderState,
      createdAt: format(item.createdAt, "MMMM do, yyyy h:mm:ss a"),
    };
  });
  return (
    <div>
      <DataTable columns={columns} data={formattedOrders} />
    </div>
  );
};

export default OrderClients;
