import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderColumn } from "./column";
import { formatter } from "@/lib/utils";
import { IoEyeOutline } from "react-icons/io5";

interface CellOrderListProps {
  data: OrderColumn;
}

const CellOrderList = ({ data }: CellOrderListProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-col cursor-pointer">
            <h3 className="font-medium">{data.items.length} Items</h3>
            <div className="text-xs flex items-center space-x-1">
              <IoEyeOutline />
              <span className="text-nowrap">Click to view</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[400px] max-w-[90%] space-y-2"
        >
          {data.items.map((item) => (
            <DropdownMenuItem key={item.id}>
              <div className="flex items-center gap-4">
                <div className="aspect-square w-10 h-10 rounded-md relative overflow-hidden shrink-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm line-clamp-1">{`${item.productName} ${item.styleName} ${item.colorName} ${item.sizeName}`}</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <p>{formatter.format(item.pricePerUnit)}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellOrderList;
