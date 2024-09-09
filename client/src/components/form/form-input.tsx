// components/FormInput.tsx
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export function FormInput<TFieldValues extends FieldValues>({
  form,
  name,
  loading,
  label,
  type = "text",
  placeholder,
  className,
  disabled,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full shrink relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={loading ?? disabled}
              placeholder={placeholder}
              className={cn(className)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
