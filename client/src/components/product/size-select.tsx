import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ISize } from "@/types/size";
import SizeChart from "./size-chart";

type Props = {
  size: ISize | undefined;
  sizes: ISize[];
  onSelect: (size: ISize | undefined) => void;
};
const SizeSelect = ({ size, onSelect, sizes }: Props) => {
  const orderedSize = sizes.sort((a, b) => a.order! - b.order!);
  return (
    <div className="">
      <div className="space-y-3">
        <div className="flex justify-between">
          <h3 className="font-medium text-slate-600 dark:text-slate-200 text-sm">
            Sizes:
            <span className="font-bold text-slate-800 dark:text-white ml-2">
              {size?.name}
            </span>
          </h3>
          <SizeChart />
        </div>
        <div className="flex gap-3 flex-wrap lg:w-[80%]">
          {orderedSize.map((item) => (
            <Button
              key={item.id}
              className={cn(
                "p-4 min-w-14 border-2 hover:border-slate-900 dark:hover:border-slate-50 transition-all",
                item.id === size?.id && "border-slate-900 dark:border-slate-50"
              )}
              onClick={() => onSelect(item)}
              variant={item.id === size?.id ? "default" : "outline"}
            >
              <span className="font-medium">{item.value}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeSelect;
