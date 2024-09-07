import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";

import { CiFileOn } from "react-icons/ci";
import { IOrder } from "@/types/order";
import { format } from "date-fns";

interface ExportCsvProps {
  data: IOrder[];
}

interface HeadersType {
  label: string;
  key: keyof IOrder;
}

const ExportCsv = ({ data }: ExportCsvProps) => {
  const formatedData = data.map((item) => ({
    ...item,
    createdAt: format(item.createdAt, "yyyy-MM-dd"),
  }));

  const headers: HeadersType[] = [
    { label: "Order ID", key: "id" },
    { label: "Customer name", key: "customerName" },
    { label: "Customer address", key: "address" },
    { label: "Customer phonenumber", key: "phoneNumber" },
    { label: "Order state", key: "orderState" },
    { label: "Payemnt state", key: "paymentState" },
    { label: "Total", key: "total" },
    { label: "Order Date", key: "createdAt" },
  ];

  const exportData = formatedData.map((item) => {
    const temp: Partial<Record<keyof IOrder, string>> = {};
    headers.forEach(({ key }) => {
      temp[key] = String(item[key]);
    });
    return temp;
  });

  return (
    <Button variant="outline" size={"sm"}>
      <CSVLink
        headers={headers}
        data={exportData}
        filename="order_export"
        className="flex items-center"
      >
        <CiFileOn className="w-4 h-4 md:mr-2" />
        <span className="hidden md:block">Export</span>
      </CSVLink>
    </Button>
  );
};

export default ExportCsv;
