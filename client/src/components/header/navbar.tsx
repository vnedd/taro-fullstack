import { useCallback, useEffect, useState } from "react";

import Container from "@/components/container";
import Logo from "@/components/logo";
import MobileNav from "./mobile-nav";
import NavMenu from "./nav-menu";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import Actions from "./actions";

const Navbar = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAuthStore();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isAtTop, setIsAtTop] = useState(true);
  const isHomePage = pathname === "/";

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsAtTop(currentScrollY === 0);
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, handleScroll]);

  return (
    <div
      className={cn(
        "w-full md:h-20 h-16 py-2 fixed bg-white dark:bg-black  top-0 left-0 right-0 z-50 transition-all duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isAtTop && "bg-transparent",
        isHomePage && isAtTop ? "text-white" : ""
      )}
    >
      <Container className="h-full flex items-center">
        <div className="grid grid-cols-8 w-full">
          <div className="col-span-2">
            <div className="flex items-start space-x-3 shrink-0 md:hidden">
              <MobileNav />
            </div>
            <div className={cn("justify-start hidden md:flex")}>
              <Logo
                type="full"
                theme={isAtTop && isHomePage ? "dark" : "light"}
              />
            </div>
          </div>
          <div className="col-span-4 flex items-center justify-center">
            <NavMenu isAtTop={isAtTop} />
            <div
              className={cn(
                "justify-start flex md:hidden",
                !isAuth && "hidden"
              )}
            >
              <Logo
                type="full"
                theme={isAtTop && isHomePage ? "dark" : "light"}
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
            <Actions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
