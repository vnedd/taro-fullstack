import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container className="lg:pt-28 py-20 space-y-8">
      <div className="lg:space-y-10 space-y-6">
        <Skeleton className="w-40 h-8" />
        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-10 gap-6">
          <Skeleton className="aspect-square w-full" />
          <div className="flex flex-col space-y-5">
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-64 h-8" />
            <Skeleton className="w-96 h-8" />
            <div className="flex items-center space-x-3">
              <Skeleton className="aspect-square w-8 h-8" />
              <Skeleton className="aspect-square w-8 h-8" />
              <Skeleton className="aspect-square w-8 h-8" />
              <Skeleton className="aspect-square w-8 h-8" />
              <Skeleton className="aspect-square w-8 h-8" />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Skeleton className="aspect-square w-24 h-11" />
              <Skeleton className="aspect-square w-24 h-11" />
              <Skeleton className="aspect-square w-24 h-11" />
              <Skeleton className="aspect-square w-24 h-11" />
              <Skeleton className="aspect-square w-24 h-11" />
              <Skeleton className="aspect-square w-24 h-11" />
              <Skeleton className="aspect-square w-24 h-11" />
            </div>
            <Skeleton className="w-96 h-8" />
            <Skeleton className="w-full h-16" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
