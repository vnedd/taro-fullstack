import { useAuthStore } from "@/store/auth";
import { ERole } from "@/types/user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { profile } = useAuthStore((s) => s);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile || profile.role !== ERole.ADMIN) {
      navigate("/");
    }
  }, [navigate, profile]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
