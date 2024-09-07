"use client";

import { ColumnDef } from "@tanstack/react-table";

import { IoCopyOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";

import toast from "react-hot-toast";
import CellOrderList from "./cell-order-list";
import { formatter } from "@/lib/utils";
import OrderStatus from "@/components/order/order-status";
import PaymentStatus from "@/components/order/order-payment-status";
import { IOrderItem } from "@/types/order";
import { Link } from "react-router-dom";

export type OrderColumn = {
  id: string;
  orderId: string;
  items: IOrderItem[];
  customerName: string;
  orderStatus: string;
  trackingCode: string | null;
  paymentState: string;
  total: number;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },

  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="flex flex-col space-y-2 text-sm">
        <div className="flex items-center gap-2 cursor-pointer ">
          <Link to={`/account/orders/${row.original.id}`}>
            {row.original.orderId}
          </Link>
          <div
            onClick={() => {
              navigator.clipboard.writeText(row.original.orderId);
              toast.success("Order ID has been copied");
            }}
          >
            <IoCopyOutline className="w-3 h-3" />
          </div>
        </div>
        <span>{row.original.createdAt}</span>
      </div>
    ),
  },
  {
    accessorKey: "buyer",
    header: "Buyer",
    cell: ({ row }) => (
      <p className="font-medium">{row.original.customerName}</p>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => <CellOrderList data={row.original} />,
  },
  {
    accessorKey: "trackingCode",
    header: "Tracking Code",
    cell: ({ row }) => (
      <div>
        {row.original.trackingCode ? (
          <a
            href={`http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=${row.original.trackingCode}&loc=en_us`}
            target="_blank"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className="font-medium">{row.original.trackingCode}</span>
          </a>
        ) : (
          "NULL"
        )}
      </div>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => <OrderStatus orderStatus={row.original.orderStatus} />,
  },
  {
    accessorKey: "paymentState",
    header: "Payment Status",
    cell: ({ row }) => (
      <PaymentStatus paymentStatus={row.original.paymentState} />
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <p className="font-semibold">{formatter.format(row.original.total)}</p>
    ),
  },
];
