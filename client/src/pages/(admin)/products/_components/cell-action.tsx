"use client";
import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./column";
import { BiEditAlt, BiCopy } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

import { useDeleteProduct } from "@/hooks/use-product";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const deleteMutation = useDeleteProduct();

  const handlerDelete = async () => {
    try {
      setLoading(true);
      deleteMutation.mutate(data.id);
      toast.success("Product removed successfully!");
    } catch (error: any) {
      if (error.response) {
        toast.success(error.response.data.message);
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Are you sure to delete this product?"
        description="Clicking delete data will not be recoverable. Are you sure?"
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handlerDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IoMdMore className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router(`/dashboard/products/copy/${data.id}`)}
          >
            <BiCopy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router(`/dashboard/products/update/${data.id}`)}
          >
            <BiEditAlt className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <AiOutlineDelete className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
