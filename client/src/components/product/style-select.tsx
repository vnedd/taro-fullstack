import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IStyle } from "@/types/style";

type Props = {
  style: IStyle | undefined;
  styles: IStyle[];
  onSelect: (style: IStyle | undefined) => void;
};
const StyleSelect = ({ style, styles, onSelect }: Props) => {
  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <h3 className="font-medium text-slate-600 dark:text-slate-200 text-sm">
          Style:
          <span className="font-bold text-slate-800 dark:text-white ml-2">
            {style?.name}
          </span>
        </h3>
      </div>
      <Select
        onValueChange={(value) =>
          onSelect(styles.find((item) => item.id === value))
        }
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Choose style" />
        </SelectTrigger>
        <SelectContent>
          {styles.map((item) => (
            <SelectItem
              key={item.id}
              defaultChecked={item.id === styles[0].id}
              value={item.id}
              className="cursor-pointer"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelect;
