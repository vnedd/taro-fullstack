import {
  logoDark,
  logoIconDark,
  logoIconLight,
  logoLight,
} from "@/constants/images";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LOGO_URL = {
  light: {
    icon: logoIconLight,
    full: logoLight,
  },
  dark: {
    icon: logoIconDark,
    full: logoDark,
  },
};

interface LogoProps {
  className?: string;
  type: "icon" | "full";
  theme: "dark" | "light";
}

const Logo = ({ className, type, theme }: LogoProps) => {
  const [url, setUrl] = useState<string>(LOGO_URL[theme][type]);

  useEffect(() => {
    setUrl(LOGO_URL[theme][type]);
  }, [theme, type]);

  return (
    <Link
      to="/"
      className={cn(
        "flex items-center space-x-3 shrink-0 relative",
        type === "icon" && "w-9 h-9",
        type === "full" && "w-40 h-12",
        className
      )}
    >
      <img src={url} className="w-full h-full" />
    </Link>
  );
};

export default Logo;
