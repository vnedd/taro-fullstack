import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavMenuProps {
  isAtTop: boolean;
}

const NavMenu = ({ isAtTop }: NavMenuProps) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const menu = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "shop",
      href: "/shop",
      active: pathname.startsWith("/shop"),
    },
    {
      label: "Faqs",
      href: "/faq",
      active: pathname === "/faq",
    },
    {
      label: "About us",
      href: "/about-us",
      active: pathname === "/about-us",
    },
    {
      label: "Blogs",
      href: "/blogs",
      active: pathname === "/blogs",
    },
  ];
  return (
    <ul className="items-center justify-center space-x-6 hidden md:flex shrink-0">
      {menu.map((item) => (
        <li key={item.label}>
          <Link
            to={item.href}
            className={cn(
              "font-normal capitalize text-sm text-nowrap border-b-2 border-b-transparent",
              item.active &&
                " dark:text-white border-b-primary text-primary dark:text-primary",
              isHomePage &&
                item.active &&
                isAtTop &&
                "border-b-white text-white"
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
