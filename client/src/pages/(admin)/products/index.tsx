import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import EmptyBlock from "@/components/emty-block";
import HeaderAction from "./_components/header-action";
import PaginationActions from "@/components/ui/data-table-pagination";
import ProductsClient from "./_components/product-client";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { useDebounce } from "use-debounce";
import ErrorBlock from "@/components/error-block";
import { Input } from "@/components/ui/input";
import { useProductLites } from "@/hooks/use-product";
import { toast } from "sonner";
const ProductsPage = () => {
  const [params, setParams] = useState({
    _page: 1,
    _limit: 5,
    name: "",
  });

  const [nameDebouce] = useDebounce(params.name, 500);

  const { data, isLoading, error, isRefetching } = useProductLites({
    ...params,
    name: nameDebouce,
  });

  useEffect(() => {
    if (nameDebouce) {
      setParams((prev) => ({ ...prev, name: nameDebouce, _page: 1 }));
    }
  }, [nameDebouce]);

  if (error) return <ErrorBlock />;

  const handlePageChange = (newPage: number) => {
    setParams((prevParams) => ({ ...prevParams, _page: newPage }));
  };

  return (
    <>
      {isRefetching && toast.info("Updating data")}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manager your platform products!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end items-center space-x-2 my-2">
            <Input
              className="max-w-96 h-[35px]"
              type="text"
              value={params.name}
              onChange={(e) =>
                setParams((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Search name.."
            />
            <HeaderAction />
          </div>
          {isLoading ? (
            <TableSkeleton />
          ) : data && data.metaData.length > 0 ? (
            <>
              <ProductsClient data={data} />
              <PaginationActions
                onPageChange={handlePageChange}
                paginationData={data}
              />
            </>
          ) : (
            <EmptyBlock
              title="You have no products"
              subTitle="You can start selling as soon as you add a category."
            />
          )}
          <Separator className="w-full my-4" />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsPage;
