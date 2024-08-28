import { useAuthStore } from "@/store/auth";
import { ERole } from "@/types/user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

const AdminLayout = () => {
  const { profile, getProfile } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (!profile || profile.role !== ERole.ADMIN) {
      navigate("/");
    }
  }, [navigate, profile]);

  if (!profile || profile.role !== ERole.ADMIN) {
    return null;
  }

  return (
    <div>
      <div className="md:w-16 md:fixed md:block inset-y-0 hidden border-r bg-white dark:bg-transparent">
        <Sidebar />
      </div>

      <div className="md:pl-16  min-h-screen">
        <Header />
        <div className="lg:p-4 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
