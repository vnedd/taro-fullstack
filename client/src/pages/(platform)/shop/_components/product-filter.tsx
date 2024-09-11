import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "use-debounce";
import { useProductLites } from "@/hooks/use-product";
import ErrorBlock from "@/components/error-block";
import DataTablePagination from "@/components/ui/data-table-pagination";
import CardSkeleton from "@/components/skeletons/cards-skeleton";
import ProductList from "@/components/product/product-list";
import { useSearchParams } from "react-router-dom";
import { TUrlParams } from "@/types/response";

import { useCallback } from "react";

const ProductFilter = () => {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<TUrlParams>({
    _page: 1,
    _limit: 10,
    name: "",
    categoryId: searchParams.get("categoryId") || undefined,
  });

  const [searchDebouce] = useDebounce(params.name, 500);

  const { data, isLoading, error } = useProductLites({
    ...params,
    name: searchDebouce,
  });

  useEffect(() => {
    if (searchDebouce) {
      setParams((prev) => ({ ...prev, name: searchDebouce, _page: 1 }));
    }
  }, [searchDebouce]);

  const handlePageChange = useCallback((newPage: number) => {
    setParams((prevParams) => ({ ...prevParams, _page: newPage }));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, name: e.target.value }));
  };

  const renderContent = useMemo(() => {
    if (isLoading)
      return (
        <div className="mt-8">
          <CardSkeleton />
        </div>
      );
    if (!data?.metaData || data.metaData.length === 0) {
      return (
        <div className="p-10 flex items-center justify-center text-sm">
          No products found!
        </div>
      );
    }
    return (
      <>
        <ProductList
          data={data.metaData}
          className="lg:grid-cols-5 md:grid-cols-4 grid-cols-2 mt-6"
        />
        <DataTablePagination
          paginationData={data}
          onPageChange={handlePageChange}
        />
      </>
    );
  }, [isLoading, data, handlePageChange]);

  if (error) return <ErrorBlock />;

  return (
    <div>
      <div className="relative max-w-md">
        <div className="absolute top-[50%] -translate-y-[50%] p-5">
          <CiSearch className="w-4 h-4 " />
        </div>
        <Input
          value={params.name}
          onChange={handleSearchChange}
          className="w-full rounded-md pl-12 h-10"
          placeholder="Search for art you'll love!"
        />
      </div>
      {renderContent}
    </div>
  );
};

export default ProductFilter;
