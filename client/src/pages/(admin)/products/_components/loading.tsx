import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="flex justify-start space-x-2">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 md:w-56 w-full" />
      </div>
      <div className="mt-3 grid lg:grid-cols-5 grid-cols-1 gap-6">
        <div className="col-span-full lg:col-span-3 flex flex-col space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <Skeleton className="w-[50%] h-8" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="space-y-4 border rounded-md p-4">
            <Skeleton className="w-[50%] h-8" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
        <div className="col-span-full lg:col-span-2  flex flex-col space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <Skeleton className="w-[50%] h-8" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="space-y-4 border rounded-md p-4">
            <Skeleton className="w-[50%] h-8" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
