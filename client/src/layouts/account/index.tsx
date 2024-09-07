import Container from "@/components/container";
import Footer from "@/components/footer";
import Navbar from "@/components/header/navbar";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./_components/sidebar";

const AccountLayout = () => {
  const { getProfile } = useAuthStore();
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div>
      <Navbar />
      <Container className="lg:pt-[60px] pt-[50px]">
        <Heading
          title="Settings"
          subTitle="Manage your account settings and set e-mail preferences."
          className="mt-6"
          variant="large"
        />
        <Separator className="my-4 w-full" />
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-6  mt-6">
          <SideBar className="lg:col-span-1 col-span-full" />
          <div className="lg:col-span-4 col-span-full pb-10">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default AccountLayout;
