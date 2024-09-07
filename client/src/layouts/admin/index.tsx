import { useAuthStore } from "@/store/auth";
import { ERole } from "@/types/user";
import { useEffect, useMemo } from "react";
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

  const isAdmin = useMemo(() => profile?.role === ERole.ADMIN, [profile]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex">
      <aside className="md:w-16 md:fixed md:inset-y-0 hidden md:flex border-r bg-white dark:bg-transparent">
        <Sidebar />
      </aside>
      <main className="flex-1 md:ml-16 min-h-screen">
        <Header />
        <div className="p-3 lg:p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
