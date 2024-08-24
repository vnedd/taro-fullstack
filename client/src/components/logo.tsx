import { logo, logoIcon } from "@/constants/images";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  type: "icon" | "full";
}

const Logo = ({ className, type }: LogoProps) => {
  const image = type === "full" ? logo : logoIcon;
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center space-x-3 shrink-0 relative",
        type === "icon" && "w-9 h-9",
        type === "full" && "w-52 h-12",
        className
      )}
    >
      <img src={image} className="w-full h-full" />
    </Link>
  );
};

export default Logo;
