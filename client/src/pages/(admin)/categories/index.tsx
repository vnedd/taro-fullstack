import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CategoriesClient from "./_components/category-client";
import EmptyBlock from "@/components/emty-block";
import HeaderAction from "./_components/header-action";
import PaginationActions from "@/components/ui/data-table-pagination";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { useCategories } from "@/hooks/use-categories";
import ErrorBlock from "@/components/error-block";

const CategoriesPage = () => {
  const [params, setParams] = useState({
    _page: 1,
    _limit: 5,
    name: "",
  });

  const [searchDebouce] = useDebounce(params.name, 400);

  const { data, isLoading, error } = useCategories({
    ...params,
    name: searchDebouce,
  });

  useEffect(() => {
    if (searchDebouce) {
      setParams((prev) => ({ ...prev, name: searchDebouce, _page: 1 }));
    }
  }, [searchDebouce]);

  if (error) return <ErrorBlock />;

  const handlePageChange = (newPage: number) => {
    setParams((prevParams) => ({ ...prevParams, _page: newPage }));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manager your platform categories!</CardDescription>
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
              <CategoriesClient data={data} />
              <PaginationActions
                onPageChange={handlePageChange}
                paginationData={data}
              />
            </>
          ) : (
            <EmptyBlock
              title="You have no categories"
              subTitle="You can start selling as soon as you add a category."
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CategoriesPage;
