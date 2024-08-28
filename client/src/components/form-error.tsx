import { cn } from "@/lib/utils";
import { IoWarningOutline } from "react-icons/io5";

interface FormErrorProps {
  message?: string;
  className?: string;
}
export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        "bg-red-400 bg-opacity-20 p-3 rounded-md flex items-center space-x-2 text-sm text-red-700",
        className
      )}
    >
      <IoWarningOutline className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
