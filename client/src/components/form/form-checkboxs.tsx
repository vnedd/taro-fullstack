import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import CheckboxCard from "@/components/checkbox-card";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";
import { ISize } from "@/types/size";
import { IColor } from "@/types/color";
import { IStyle } from "@/types/style";

interface FormCheckboxsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  items: ISize[] | IColor[] | IStyle[];
  loading: boolean;
}

export function FormCheckboxs<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  items,
  loading,
}: FormCheckboxsProps<TFieldValues>) {
  const selectedValues = useWatch({
    control,
    name: name,
  }) as string[];

  const allSelected =
    items.length > 0 && selectedValues?.length === items.length;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-2">
            <FormLabel>{label}</FormLabel>
          </div>
          <div className="mb-2">
            <CheckboxCard>
              <FormControl>
                <Checkbox
                  checked={allSelected}
                  disabled={loading}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? items.map((item) => item.id)
                      : [];
                    field.onChange(newValues);
                  }}
                />
              </FormControl>
              <p>Select All</p>
            </CheckboxCard>
          </div>
          <div className="grid grid-cols-2 lg:gap-4 gap-2">
            {items.map((item) => (
              <FormItem key={item.id}>
                <CheckboxCard>
                  <FormControl>
                    <Checkbox
                      checked={selectedValues?.includes(item.id)}
                      disabled={loading}
                      onCheckedChange={(checked) => {
                        const updatedValues = checked
                          ? [...(selectedValues || []), item.id]
                          : (selectedValues || []).filter(
                              (value: string) => value !== item.id
                            );
                        field.onChange(updatedValues);
                      }}
                    />
                  </FormControl>
                  <p>{item.name}</p>
                </CheckboxCard>
              </FormItem>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
