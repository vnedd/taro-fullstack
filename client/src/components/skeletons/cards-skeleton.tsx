import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  items?: number;
}

const CardSkeleton = ({ items = 4 }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="col-span-1 h-96">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
