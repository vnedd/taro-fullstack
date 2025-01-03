import Footer from "@/components/footer";
import Navbar from "@/components/header/navbar";
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
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
