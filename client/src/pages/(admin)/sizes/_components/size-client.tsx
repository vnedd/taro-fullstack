import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { columns, SizeColumn } from "./column";
import { useDeleteSize } from "@/hooks/use-sizes";
import { IPaginationResponse } from "@/types/response";
import { ISize } from "@/types/size";

interface SizesClientProps {
  data: IPaginationResponse<ISize>;
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const deleteCateMutation = useDeleteSize();

  const handleDelete = (selectedRows: SizeColumn[]) => {
    for (let i = 0; i < selectedRows.length; i++) {
      deleteCateMutation.mutate(selectedRows[i].id);
    }
  };

  const formatedSizes: SizeColumn[] = data.metaData.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: format(size.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={formatedSizes}
        onDelete={handleDelete}
      />
    </>
  );
};

export default SizesClient;
