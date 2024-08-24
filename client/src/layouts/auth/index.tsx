import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AiOutlineHome } from "react-icons/ai";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

const AuthLayout = () => {
  const { isAuth } = useAuthStore((s) => s);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [navigate, isAuth]);
  return (
    <div className="relative h-screen w-full flex items-center justify-center   bg-no-repeat bg-cover bg-top">
      <Button className="absolute top-2 left-2 " variant={"ghost"}>
        <Link to={"/"} className="flex items-center gap-x-2">
          <AiOutlineHome size={18} />
          Home Page
        </Link>
      </Button>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
