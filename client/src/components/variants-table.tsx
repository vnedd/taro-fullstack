import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IVariant } from "@/types/product";

interface VariantsTableProps {
  variants: IVariant[];
  onQuantityChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onDelete: (index: number) => void;
  loading?: boolean;
}

const VariantsTable = ({
  variants,
  onPriceChange,
  onQuantityChange,
  onDelete,
  loading,
}: VariantsTableProps) => {
  return (
    <ScrollArea
      className={cn(
        "relative mt-5 select-none overflow-auto max-w-full whitespace-nowrap h-[500px]",
        variants.length <= 2 && "h-[200px]",
        variants.length <= 4 && "h-[300px]"
      )}
    >
      <Table className="w-full border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-full overflow-x-auto">
        <TableCaption>A list of your product variations.</TableCaption>
        <TableHeader className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead scope="col" className="px-6 py-3">
              Product Type
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Color
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Size
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Price
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Quantity
            </TableHead>
            <TableHead scope="col" className="px-6 py-3"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative ">
          {variants.map((variant, index) => (
            <TableRow key={index} className="border-b ">
              <TableHead
                scope="row"
                className="px-2 py-3 font-medium text-xs md:text-sm text-gray-900 whitespace-nowrap dark:text-white"
              >
                {variant.styleName}
              </TableHead>
              <TableCell className=" px-2 py-3 font-medium text-xs md:text-sm text-gray-900 whitespace-nowrap dark:text-white">
                {variant.colorName}
              </TableCell>
              <TableCell className=" px-2 py-3 font-medium text-xs md:text-sm text-gray-900 whitespace-nowrap dark:text-white">
                {variant.sizeName}
              </TableCell>
              <TableCell className="px-2 py-3 relative font-medium ">
                <Input
                  value={variant.price || ""}
                  onChange={(event) => onPriceChange(event, index)}
                  disabled={loading}
                  type="number"
                  className="max-w-[150px] min-w-[100px] pl-7"
                />
                <div className="absolute top-[50%] -translate-y-[50%] p-2">
                  <RiMoneyDollarCircleLine className=" w-4 h-4 " />
                </div>
              </TableCell>
              <TableCell className="px-2 py-3 relative font-medium ">
                <Input
                  value={variant.stock || ""}
                  onChange={(event) => onQuantityChange(event, index)}
                  disabled={loading}
                  type="number"
                  className="max-w-[150px] min-w-[100px]"
                />
              </TableCell>
              <TableCell className="px-2 py-3 relative">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  type="button"
                  onClick={() => onDelete(index)}
                >
                  <RiDeleteBin6Line />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default VariantsTable;
