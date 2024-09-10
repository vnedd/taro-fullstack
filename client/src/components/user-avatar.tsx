import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useActiveList from "@/hooks/use-active-list";
import { cn } from "@/lib/utils";
interface UserAvatarProps {
  userId?: string;
  url?: string | undefined;
  className?: string;
}

const UserAvatar = ({ url, className, userId }: UserAvatarProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(userId as string) !== -1;

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute z-40 top-1 -right-1 w-2.5 h-2.5 rounded-full bg-slate-400 border border-secondary",
          isActive && "bg-green-500"
        )}
      />
      <Avatar
        className={cn(
          "w-8 h-8 text-white outline-none ring-1 ring-primary ",
          className
        )}
      >
        <AvatarImage
          className="object-cover"
          src={url || "/images/user-avatar.png"}
          alt={"user avatar"}
        />
      </Avatar>
    </div>
  );
};

export default UserAvatar;
