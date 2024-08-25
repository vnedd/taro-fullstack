import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IPaginationResponse } from "@/types/response";

interface DataTablePaginationProps<T> {
  paginationData: IPaginationResponse<T>;
  onPageChange: (page: number) => void;
}

const DataTablePagination = <T,>({
  paginationData,
  onPageChange,
}: DataTablePaginationProps<T>) => {
  const { page, totalPages } = paginationData!;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      pageNumbers.push(renderPageButton(1));

      if (page > 3) {
        pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      if (startPage === 2) endPage = Math.min(totalPages - 1, 4);
      if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (page < totalPages - 2) {
        pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      pageNumbers.push(renderPageButton(totalPages));
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber: number) => (
    <PaginationItem key={pageNumber}>
      <PaginationLink
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(pageNumber);
        }}
        isActive={pageNumber === page}
      >
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
          />
        </PaginationItem>

        <div className="hidden md:flex md:gap-1"> {renderPageNumbers()}</div>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DataTablePagination;
