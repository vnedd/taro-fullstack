import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { ProductColumn, columns } from "./column";
import { useDeleteProduct } from "@/hooks/use-product";
import { IPaginationResponse } from "@/types/response";
import { IProduct } from "@/types/product";
interface ProductsClientProps {
  data: IPaginationResponse<IProduct>;
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const deleteCProductMutation = useDeleteProduct();

  const handleDelete = (selectedRows: ProductColumn[]) => {
    for (let i = 0; i < selectedRows.length; i++) {
      deleteCProductMutation.mutate(selectedRows[i].id);
    }
  };

  const formattedProducts: ProductColumn[] | undefined = data.metaData.map(
    (item: IProduct) => {
      return {
        id: item.id,
        name: item.name,
        category: item.category.name,
        isFeatured: item.isFeatured,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        image: item.images[0],
        discount: item.discount,
      };
    }
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={formattedProducts}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ProductsClient;
