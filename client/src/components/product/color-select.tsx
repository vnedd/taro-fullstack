"use client";

import { cn } from "@/lib/utils";
import { IColor } from "@/types/color";

type Props = {
  color: IColor | undefined;
  colors: IColor[];
  onSelect: (color: IColor | undefined) => void;
};

const ColorSelect = ({ color, onSelect, colors }: Props) => {
  const orderedColors = colors.sort((a, b) => a.order! - b.order!);
  return (
    <div className="">
      <div className="space-y-3">
        <h3 className="font-medium text-slate-600 dark:text-slate-200 text-sm">
          Colors:
          <span className="font-bold text-slate-800 dark:text-white ml-2">
            {color?.name}
          </span>
        </h3>
        <div className="flex gap-3 flex-wrap">
          {orderedColors.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                "w-7 h-7 rounded-md border  ring-slate-700 dark:ring-white cursor-pointer",
                item?.id === color?.id && "ring-2"
              )}
              style={{
                backgroundColor: item?.value,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelect;
