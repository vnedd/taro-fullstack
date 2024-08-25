import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { IPaginationResponse } from "@/types/response";
import { ICategory } from "@/types/category";
import { columns, StylesColumn } from "./column";
import { useDeleteStyle } from "@/hooks/use-styles";
interface StylesClientProps {
  data: IPaginationResponse<ICategory>;
}

const StylesClient: React.FC<StylesClientProps> = ({ data }) => {
  const deleteCateMutation = useDeleteStyle();

  const handleDelete = (selectedRows: StylesColumn[]) => {
    for (let i = 0; i < selectedRows.length; i++) {
      deleteCateMutation.mutate(selectedRows[i].id);
    }
  };

  const formatedStyles: StylesColumn[] = data.metaData.map((cate) => {
    return {
      id: cate.id,
      name: cate.name,
      imageUrl: cate?.imageUrl || "",
      description: cate.description || "No descriptions",
      createdAt: format(cate.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={formatedStyles}
        onDelete={handleDelete}
      />
    </>
  );
};

export default StylesClient;
