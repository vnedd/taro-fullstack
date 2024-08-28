import { ColumnDef } from "@tanstack/react-table";

import { IoEyeOutline } from "react-icons/io5";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { IoCopyOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import CellAction from "./cell-action";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { dataPlaceholderImage } from "@/constants/images";

export type ProductColumn = {
  id: string;
  name: string;
  category: string | undefined;
  isFeatured: boolean;
  discount: number | undefined;
  image: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger>
              <div className="relative w-12 h-12 group flex items-center justify-center sr-only">
                <IoEyeOutline className="w-4 h-4 z-40 text-white opacity-0 group-hover:opacity-100 transition object-cover" />
                <img
                  src={row.original.image || dataPlaceholderImage[0]}
                  alt={row.original.name}
                  className="aspect-square w-full rounded-md group-hover:brightness-75 transition object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="md:w-[500px] md:h-[500px] w-[90%] h-[500px] p-4 rounded-md">
              <div className="relative w-full h-full">
                <img
                  src={row.original.image || dataPlaceholderImage[0]}
                  alt={row.original.name}
                  className="aspect-square w-full rounded-md group-hover:brightness-75 transition object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
          <div className="space-y-2">
            <p className="font-medium line-clamp-1">{row.original.name}</p>
            <div
              className="md:flex items-center space-x-2 cursor-pointer text-xs hover:underline hidden"
              onClick={() => {
                navigator.clipboard.writeText(row.original.id);
                toast("Coppied to clipboard!");
              }}
            >
              <span> ID: {row.original.id}</span> <IoCopyOutline />
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <Badge className="font-medium" variant={"secondary"}>
          {row.original.category}
        </Badge>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      return (
        <Badge
          className="font-medium"
          variant={row.original.discount ? "success" : "secondary"}
        >
          {row.original.discount ? `${row.original?.discount}%` : "0%"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured?",
    cell: ({ row }) => {
      return (
        <Badge
          className="font-medium"
          variant={row.original.isFeatured ? "default" : "destructive"}
        >
          {row.original.isFeatured ? "True" : "False"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Create At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
