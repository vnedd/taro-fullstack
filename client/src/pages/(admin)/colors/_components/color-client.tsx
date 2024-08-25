import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { useDeleteColor } from "@/hooks/use-colors";
import { IPaginationResponse } from "@/types/response";
import { IColor } from "@/types/color";
import { ColorColumn, columns } from "./column";

interface SizesClientProps {
  data: IPaginationResponse<IColor>;
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const deleteCateMutation = useDeleteColor();

  const handleDelete = (selectedRows: ColorColumn[]) => {
    for (let i = 0; i < selectedRows.length; i++) {
      deleteCateMutation.mutate(selectedRows[i].id);
    }
  };

  const formatedSizes: ColorColumn[] = data.metaData.map((color) => {
    return {
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: format(color.createdAt, "MMMM do, yyyy"),
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
