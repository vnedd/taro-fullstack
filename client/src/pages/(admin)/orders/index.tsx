import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import EmptyBlock from "@/components/emty-block";
import PaginationActions from "@/components/ui/data-table-pagination";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import ErrorBlock from "@/components/error-block";
import OrderClients from "./_components/order-client";
import { useOrders } from "@/hooks/use-orders";
import { TOrderUrlParams } from "@/types/response";
import OrderStateTabs from "./_components/order-state-tabs";

const OrdersPage = () => {
  const [params, setParams] = useState<TOrderUrlParams>({
    _page: 1,
    _limit: 5,
  });

  const { data, isLoading, error } = useOrders({
    ...params,
  });

  if (error) return <ErrorBlock />;

  const handlePageChange = (newPage: number) => {
    setParams((prevParams) => ({ ...prevParams, _page: newPage }));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Orders({data?.totalDocs})</CardTitle>
          <CardDescription>Manager your platform orders!</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStateTabs onSetParams={setParams} params={params} />
          {isLoading ? (
            <TableSkeleton />
          ) : data && data.metaData.length > 0 ? (
            <>
              <OrderClients data={data.metaData} />
              <PaginationActions
                onPageChange={handlePageChange}
                paginationData={data}
              />
            </>
          ) : (
            <EmptyBlock
              title="You have no orders"
              subTitle="You can start selling as soon as you add a order."
            />
          )}
          <Separator className="w-full my-4" />
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersPage;
