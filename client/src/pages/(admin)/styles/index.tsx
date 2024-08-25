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
import StylesClient from "./_components/style-client";
import EmptyBlock from "@/components/emty-block";
import HeaderAction from "./_components/header-action";
import PaginationActions from "@/components/ui/data-table-pagination";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import ErrorBlock from "@/components/error-block";
import { useStyles } from "@/hooks/use-styles";

const StylesPage = () => {
  const [params, setParams] = useState({
    _page: 1,
    _limit: 5,
    name: "",
  });

  const [searchDebouce] = useDebounce(params.name, 400);

  const { data, isLoading, error } = useStyles({
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
          <CardTitle>Styles</CardTitle>
          <CardDescription>Manager your platform styles!</CardDescription>
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
              <StylesClient data={data} />
              <PaginationActions
                onPageChange={handlePageChange}
                paginationData={data}
              />
            </>
          ) : (
            <EmptyBlock
              title="You have no styles"
              subTitle="You can start selling as soon as you add a style."
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default StylesPage;
