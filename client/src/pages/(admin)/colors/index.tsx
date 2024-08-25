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
import EmptyBlock from "@/components/emty-block";
import HeaderAction from "./_components/header-action";
import PaginationActions from "@/components/ui/data-table-pagination";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import ErrorBlock from "@/components/error-block";
import { useColors } from "@/hooks/use-colors";
import ColorsClient from "./_components/color-client";

const ColorsPage = () => {
  const [params, setParams] = useState({
    _page: 1,
    _limit: 5,
    name: "",
  });

  const [searchDebouce] = useDebounce(params.name, 400);

  const { data, isLoading, error } = useColors({
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
          <CardTitle>Colors</CardTitle>
          <CardDescription>Manager your platform colors!</CardDescription>
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
              <ColorsClient data={data} />
              <PaginationActions
                onPageChange={handlePageChange}
                paginationData={data}
              />
            </>
          ) : (
            <EmptyBlock
              title="You have no colors"
              subTitle="You can start selling as soon as you add a color."
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ColorsPage;
