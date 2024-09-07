import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatter } from "@/lib/utils";
import { IOrder } from "@/types/order";
interface RecentOrdersProps {
  data: IOrder[];
}

const RecentOrders = ({ data }: RecentOrdersProps) => {
  return (
    <ScrollArea className="max-h-[350px] overflow-y-auto hidden-scrollbar">
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Customer</TableHead>
            <TableHead className="hidden md:flex items-center justify-end">
              Date
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-nowrap">
                {item.customerName}
              </TableCell>
              <TableCell className="hidden md:block text-end">
                {format(item.createdAt, "MMMM do, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                {formatter.format(item.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default RecentOrders;
