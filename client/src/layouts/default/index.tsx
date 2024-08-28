import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { getProfile } = useAuthStore();
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
