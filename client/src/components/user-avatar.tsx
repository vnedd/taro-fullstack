import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
interface UserAvatarProps {
  url: string | null | undefined;
  className?: string;
}

const UserAvatar = ({ url, className }: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "w-8 h-8 bg-slate-800 text-white outline-none ring-0 active:ring-0",
        className
      )}
    >
      <AvatarImage
        className="object-cover"
        src={url || "/images/user-avatar.png"}
        alt={"user avatar"}
      />
    </Avatar>
  );
};

export default UserAvatar;
