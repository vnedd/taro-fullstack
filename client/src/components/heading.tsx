import { cn } from "@/lib/utils";
import React from "react";

type HeadingVariants = "small" | "medium" | "large";

interface HeadingProps {
  title: string;
  subTitle?: string;
  className?: string;
  variant?: HeadingVariants;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subTitle,
  className,
  variant,
  isCenter,
}) => {
  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <h3
        className={cn(
          " dark:text-white italic",
          variant === "small" && "font-medium md:text-xl text-lg",
          variant === "medium" && "font-semibold text-lg",
          variant === "large" &&
            "lg:font-extrabold font-bold  uppercase  md:text-2xl text-xl"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-slate-700 dark:text-gray-300 text-sm",
          isCenter && "text-center"
        )}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default Heading;
