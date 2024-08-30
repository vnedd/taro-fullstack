"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu2Line, RiShoppingBag2Line } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { BsQuestionDiamond } from "react-icons/bs";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menu = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
      icon: AiOutlineHome,
    },
    {
      label: "shop",
      href: "/shop",
      active: pathname.startsWith("/shop"),
      icon: RiShoppingBag2Line,
    },
    {
      label: "FAQ",
      href: "/faq",
      active: pathname === "/faq",
      icon: BsQuestionDiamond,
    },
  ];
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <RiMenu2Line className="w-10 h-10" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col">
        <SheetHeader>
          <div className="">
            <Logo type="full" theme="light" />
          </div>
        </SheetHeader>
        <ul className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className={cn(
                  "p-2 px-3 hover:bg-sky-50 hover:bg-opacity-80 dark:hover:bg-sky-900 hover:text-sky-800 dark:hover:text-white rounded-md text-sm transition-all",
                  item.active &&
                    "bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-white"
                )}
              >
                <Link
                  onClick={handleClose}
                  to={item.href}
                  className={cn("flex items-center")}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
