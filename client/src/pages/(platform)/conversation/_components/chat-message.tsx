import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { IMessage } from "@/types/conversation";
import { useAuthStore } from "@/store/auth";
import { BsCheckAll } from "react-icons/bs";

interface ChatMessageProps {
  data: IMessage;
  isLastMessage?: boolean;
}

const ChatMessage = ({ data, isLastMessage }: ChatMessageProps) => {
  const { profile } = useAuthStore();
  const isOwn = data.senderId.id === profile?.id;

  return (
    <div className={cn("flex gap-3 p-4 select-none", isOwn && "justify-end")}>
      <div className={cn("flex flex-col gap-1", isOwn && "items-end")}>
        <div
          className={cn(
            "text-sm w-fit overflow-hidden px-4 py-2.5",
            isOwn
              ? "bg-gradient-to-r bg-primary text-white rounded-b-xl rounded-tl-xl"
              : "bg-gray-100 rounded-b-xl rounded-tr-xl text-gray-800",
            data.image ? "rounded-md p-0" : "py-2 px-3"
          )}
        >
          {data?.image ? (
            <img
              src={data.image}
              alt="Image"
              width={1000}
              height={1000}
              className="w-72 h-72 cursor-pointer object-cover hover:scale-105 transition ease-in-out rounded-md"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        <div className={`flex gap-2`}>
          <div className="text-xs text-muted-foreground">
            {format(new Date(data.createdAt), "p")}
          </div>
          {isLastMessage && isOwn && data.isSeen && (
            <div className={`text-xs text-blue-500`}>
              <BsCheckAll className="w-4 h-4 text-current" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
