import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./_components/sidebar";
import StartContent from "./_components/start-content";

const ChatLayout = () => {
  const { getProfile, isAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  const isRootPath = location.pathname === "/conversations";

  return (
    <div className="h-screen flex flex-col">
      <Sidebar />
      <div className="md:pl-72 w-full h-full ">
        {isRootPath ? <StartContent /> : <Outlet />}
      </div>
    </div>
  );
};

export default ChatLayout;
