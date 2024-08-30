import SidebarMenu from "./sidebar-menu";
import Logo from "@/components/logo";

const Sidebar = () => {
  return (
    <div className="flex items-center flex-col py-2 space-y-4 ">
      <div className="flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 p-1">
        <Logo type="icon" theme="light" />
      </div>
      <SidebarMenu />
    </div>
  );
};

export default Sidebar;
