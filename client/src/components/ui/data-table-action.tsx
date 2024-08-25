import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import AlertModal from "@/components/modals/alert-modal";

interface DataTableActionsProps<TData> {
  table: Table<TData>;
  onDelete: (selectedRows: TData[]) => void;
}

export function DataTableActions<TData>({
  table,
  onDelete,
}: DataTableActionsProps<TData>) {
  const [open, setOpen] = useState<boolean>(false);
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelectedRows = selectedRows.length > 0;

  if (!hasSelectedRows) {
    return (
      <div className="flex-1 text-sm text-muted-foreground">
        No rows selected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRows.length} of {table.getFilteredRowModel().rows.length}{" "}
        row(s) selected
      </div>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Are you sure you want to delete this fields?"
        description="This action cannot be undone. This will permanently delete your category and remove it from our servers."
        onConfirm={() => {
          onDelete(selectedRows.map((row) => row.original));
          setOpen(false);
          toast("Deleted successfully!");
        }}
      />
    </div>
  );
}
