import { cn } from "@/lib/utils";
import { RiMenu3Line } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCodesandboxLogo } from "react-icons/rx";
import { CgStyle } from "react-icons/cg";
import { IoIosColorFilter } from "react-icons/io";
import { TbResize } from "react-icons/tb";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import Logo from "@/components/logo";
import { useLocation, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const router = useNavigate();

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
      href: "/dashboard/orders",
      label: "Orders",
      icon: <IoBagHandleOutline className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/orders"),
    },
  ];

  const handleSelect = (href: string) => {
    setOpen(false);
    router(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="px-3 py-2 rounded-md hover:bg-secondary dark:hover:bg-secondary transition cursor-pointer">
          <RiMenu3Line className="w-4 h-4" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <Logo type="full" />
          </SheetTitle>
          <SheetDescription className="text-left">
            Make changes to your store here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col mt-6 space-y-1">
          {routes.map((route) => {
            return (
              <div
                key={route.href}
                onClick={() => handleSelect(route.href)}
                className={cn(
                  "cursor-pointer p-2 font-medium px-3 flex items-center space-x-3 hover:bg-muted dark:hover:bg-secondary hover:text-primary dark:hover:text-white rounded-md transition-all",
                  route.isActive &&
                    "bg-muted dark:bg-primary-foreground dark:hover:bg-primary-foreground text-primary dark:text-white"
                )}
              >
                {route.icon}
                <span>{route.label}</span>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
