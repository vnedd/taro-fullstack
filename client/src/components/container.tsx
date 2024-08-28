import { cn } from "@/lib/utils";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn("max-w-[1600px] mx-auto xl:px-20 md:px-4 px-2", className)}
    >
      {children}
    </div>
  );
};

export default Container;
