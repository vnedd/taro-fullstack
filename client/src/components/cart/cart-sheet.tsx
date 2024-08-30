import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CartSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const CartSheet = ({ open, onClose, children, title }: CartSheetProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Sheet open={open} onOpenChange={onChange}>
      <SheetContent className="md:min-w-[500px] w-[80vw] dark:bg-black">
        <SheetHeader className="text-left">
          <SheetTitle className="font-extrabold">{title}</SheetTitle>
          <SheetDescription>
            Click checkout to enjoy our incentives and discount policies
          </SheetDescription>
        </SheetHeader>
        <hr className="w-full md:my-5 my-2" />
        <div>{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
