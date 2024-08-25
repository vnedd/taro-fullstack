import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoEyeOutline } from "react-icons/io5";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CategoriesColumn = {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
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
    enableSorting: false,
    enableHiding: false,
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
                <IoEyeOutline className="w-4 h-4 z-10 text-white opacity-0 group-hover:opacity-100 transition" />
                <img
                  src={
                    row.original.imageUrl ||
                    "/product-placeholder-images/s1.svg"
                  }
                  alt={row.original.name}
                  className="aspect-square w-full rounded-md group-hover:brightness-75 transition object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="md:w-[500px] md:h-[500px] w-[90%] h-[500px] p-4 rounded-md">
              <div className="relative w-full h-full">
                <img
                  src={
                    row.original.imageUrl ||
                    "/product-placeholder-images/s1.svg"
                  }
                  alt={row.original.name}
                  className="aspect-square w-full rounded-md group-hover:brightness-75 transition object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
          <div className="space-y-2">
            <p className="font-medium line-clamp-1">{row.original.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="line-clamp-1 max-w-96">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
