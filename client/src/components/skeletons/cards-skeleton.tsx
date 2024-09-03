import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  items?: number;
}

const CardSkeleton = ({ items = 4 }: CardSkeletonProps) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 w-full">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="col-span-1 lg:h-80 h-72">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
