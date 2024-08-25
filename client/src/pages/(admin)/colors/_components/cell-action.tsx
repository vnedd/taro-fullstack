import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "@/components/ui/modal";
import ColorsForm from "./color-form";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import { useDeleteColor } from "@/hooks/use-colors";
import { ColorColumn } from "./column";

interface CellActionProps {
  data: ColorColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const deleteMutation = useDeleteColor();
  const [loading, setLoading] = useState(false);

  const handlerDelete = async () => {
    try {
      setLoading(true);
      deleteMutation.mutate(data.id);
      toast.success("Color Deleted!");
    } catch (error: any) {
      if (error.response) {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        title="Update color"
        description="This action cannot be undone. Be careful!"
      >
        <ColorsForm initialData={data} onSetShow={setShow} />
      </Modal>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Are you sure you want to delete this color?"
        description="This action cannot be undone. This will permanently delete your color and remove it from our servers."
        onConfirm={handlerDelete}
        loading={loading}
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setShow(true)}
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
