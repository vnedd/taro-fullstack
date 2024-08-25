import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { columns, CategoriesColumn } from "./column";
import { useDeleteCategory } from "@/hooks/use-categories";
import { IPaginationResponse } from "@/types/response";
import { ICategory } from "@/types/category";
interface CategoriesClientProps {
  data: IPaginationResponse<ICategory>;
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const deleteCateMutation = useDeleteCategory();

  const handleDelete = (selectedRows: CategoriesColumn[]) => {
    for (let i = 0; i < selectedRows.length; i++) {
      deleteCateMutation.mutate(selectedRows[i].id);
    }
  };

  const formatedCategories: CategoriesColumn[] = data.metaData.map((cate) => {
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
        data={formatedCategories}
        onDelete={handleDelete}
      />
    </>
  );
};

export default CategoriesClient;
