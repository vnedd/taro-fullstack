import { AiOutlineHome } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCodesandboxLogo } from "react-icons/rx";
import { CgStyle } from "react-icons/cg";
import { IoIosColorFilter } from "react-icons/io";
import { TbResize } from "react-icons/tb";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";

const SidebarMenu = () => {
  const { pathname } = useLocation();
  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <AiOutlineHome className="w-5 h-5" />,
      isActive: pathname === "/dashboard",
    },
    {
      href: "/dashboard/categories",
      label: "Categories",
      icon: <RxCodesandboxLogo className="w-5 h-5" />,
      isActive: pathname === "/dashboard/categories",
    },
    {
      href: "/dashboard/styles",
      label: "Styles",
      icon: <CgStyle className="w-5 h-5" />,
      isActive: pathname === "/dashboard/styles",
    },
    {
      href: "/dashboard/colors",
      label: "Colors",
      icon: <IoIosColorFilter className="w-5 h-5" />,
      isActive: pathname === "/dashboard/colors",
    },
    {
      href: "/dashboard/sizes",
      label: "Sizes",
      icon: <TbResize className="w-5 h-5" />,
      isActive: pathname === "/dashboard/sizes",
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: <BsBox className="w-4 h-4" />,
      isActive: pathname.startsWith("/dashboard/products"),
    },
    {
      href: "/dashboard/orders?state=All",
      label: "Orders",
      icon: <IoBagHandleOutline className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/orders"),
    },
  ];
  return (
    <ul className="flex flex-col items-center space-y-2 w-full">
      {routes.map((route) => (
        <TooltipProvider delayDuration={10} key={route.label}>
          <Tooltip>
            <TooltipTrigger>
              <li
                className={cn(
                  "w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-muted rounded-md text-muted-foreground active:animate-waving-hand",
                  route.isActive && "bg-muted text-primary"
                )}
              >
                <Link to={route.href}>{route.icon}</Link>
              </li>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-white">
              <p>{route.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </ul>
  );
};

export default SidebarMenu;
