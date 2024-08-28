import React from "react";
import { FormLabel } from "./ui/form";
import { cn } from "@/lib/utils";

interface CheckboxCardProps {
  children: React.ReactNode;
  className?: string;
}

const CheckboxCard = ({ className, children }: CheckboxCardProps) => {
  return (
    <FormLabel
      className={cn(
        "cursor-pointer p-4 flex items-center space-x-2 mt-2 rounded-md border select-none",
        className
      )}
    >
      {children}
    </FormLabel>
  );
};

export default CheckboxCard;
