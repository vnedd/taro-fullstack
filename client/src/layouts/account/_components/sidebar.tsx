import { BsHandbag } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { TbUserExclamation } from "react-icons/tb";
import { BsBookmarkHeart } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
  className?: string;
}

const SideBar = ({ className }: SideBarProps) => {
  const { pathname } = useLocation();
  const sidebarMenu = [
    {
      label: "My profiles",
      href: "/account/profile",
      icon: TbUserExclamation,
      active: pathname.startsWith("/account/profile"),
    },
    {
      label: "Wishlist",
      href: "/account/wishlist",
      icon: BsBookmarkHeart,
      active: pathname.startsWith("/account/wishlist"),
    },
    {
      label: "My orders",
      href: "/account/orders",
      icon: BsHandbag,
      active: pathname.startsWith("/account/orders"),
    },
  ];

  return (
    <div className={cn("", className)}>
      <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "p-2 px-3 flex items-center space-x-2 rounded-md  dark:hover:text-white text-sm transition-all",
                item.active && "bg-secondary dark:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              <p className="text-sm">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
