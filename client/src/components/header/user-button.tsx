import { useState } from "react";
import { TbUserExclamation } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlHandbag } from "react-icons/sl";
import UserAvatar from "@/components/user-avatar";
import { GoPerson } from "react-icons/go";
import { BsChatRightDots } from "react-icons/bs";
import { useAuthStore } from "@/store/auth";
import { Link, useNavigate } from "react-router-dom";
import { ERole } from "@/types/user";

const USER_MENU = [
  {
    label: "Profile",
    icon: TbUserExclamation,
    href: "/account/profile",
  },
  {
    label: "My orders",
    icon: SlHandbag,
    href: "/account/orders",
  },
  {
    label: "Wishlist",
    icon: IoSettingsOutline,
    href: "/account/wishlist",
  },
  {
    label: "Chat with admin",
    icon: BsChatRightDots,
    href: "/conversations",
  },
];

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { profile, logout } = useAuthStore();

  const handleLogout = () => {
    logout(() => {
      navigate("/auth/login");
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <GoPerson className="w-6 h-6 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuLabel className="text-sm">
          <div className="flex items-center space-x-3">
            <UserAvatar url={profile?.avatarUrl} userId={profile?.id} />
            <p className="text-sm">{profile?.username}</p>
          </div>
        </DropdownMenuLabel>
        {profile?.role === ERole.ADMIN && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setOpen(false)}>
              <Link
                to={"/dashboard"}
                className="flex items-center gap-3 cursor-pointer"
              >
                <IoStorefrontOutline className="w-4 h-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        {USER_MENU.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.label} onSelect={() => setOpen(false)}>
              <Link
                to={item.href}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex space-x-3 cursor-pointer"
          onSelect={handleLogout}
        >
          <BiLogOut className="w-4 h-4" />
          <p>Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
