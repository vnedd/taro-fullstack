import { formatter } from "@/lib/utils";
import { IOrderItem } from "@/types/order";
import { Separator } from "../ui/separator";

type OrderProductItemProps = {
  item: IOrderItem;
};

const OrderProductItem = ({ item }: OrderProductItemProps) => {
  return (
    <div className="flex md:gap-6 gap-2 flex-col border-b pb-4">
      <div className="flex flex-nowrap md:space-x-4 space-x-3">
        <div className="shrink-0 md:w-24 md:h-24 w-20 h-20 aspect-square rounded-md relative border overflow-hidden">
          <img src={item.productImage} alt={item.productName} />
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="font-medium line-clamp-1 md:line-clamp-2">
            {item.productName}
          </h3>
          <div className="flex flex-col">
            <div className="flex  gap-x-1 md:items-center flex-col items-start md:flex-row">
              <p className="font-normal pr-1 md:text-sm text-xs text-muted-foreground">
                {item.sizeName}
              </p>
              <Separator orientation="vertical" className="hidden md:block" />
              <p className="font-normal pr-1 md:text-sm text-xs text-muted-foreground">
                {item.colorName}
              </p>
              <Separator orientation="vertical" className="hidden md:block" />
              <p className="font-normal pr-1 md:text-sm text-xs text-muted-foreground text-nowrap">
                {item.styleName}
              </p>
            </div>
            <p className="mt-1 md:text-sm text-xs text-gray-500 dark:text-gray-200">
              Quantity:{" "}
              <span className="font-normal text-nowrap">{item.quantity}</span>
            </p>
            <p className="mt-1 md:text-sm text-xs text-gray-500 dark:text-gray-200">
              Price:{" "}
              <span className="font-medium text-sky-800 dark:text-sky-300 text-nowrap">
                {formatter.format(item.pricePerUnit)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
