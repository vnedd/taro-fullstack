import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import UserAvatar from "@/components/user-avatar";
import { IConversation } from "@/types/conversation";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import useOtherUser from "@/hooks/use-orther-user";
import { cn } from "@/lib/utils";

interface ConversationBoxProps {
  data: IConversation;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    navigate(`/conversations/${data.id}`);
  }, [data.id, navigate]);

  const lastMessage = useMemo(
    () => data.messages?.[data.messages.length - 1],
    [data.messages]
  );

  console.log(lastMessage);

  const sender = useMemo(() => {
    if (!lastMessage) {
      return "";
    }
    if (lastMessage.senderId.id === profile?.id) {
      return "You";
    }
    return lastMessage?.senderId?.username;
  }, [lastMessage, profile?.id]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;
    return "Started a conversation";
  }, [lastMessage]);

  const isUnread =
    lastMessage &&
    !lastMessage.isSeen &&
    lastMessage.senderId?.id !== profile?.id;

  console.log(otherUser.avatarUrl);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full select-none relative flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg transition cursor-pointer",
        selected
          ? "bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-900 hover:bg-gray-200"
          : "bg-white dark:bg-transparent"
      )}
    >
      <UserAvatar
        className="border-none w-9 h-9"
        url={otherUser.avatarUrl}
        userId={otherUser.id}
      />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none flex flex-col items-start">
          <div className="flex items-center justify-between w-full">
            <p className="font-semibold capitalize text-gray-900 dark:text-white text-xs">
              {otherUser?.username}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-[10px] text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <div className="flex items-center justify-start w-full">
            <p
              className={cn(
                "truncate text-xs",
                isUnread || !lastMessage
                  ? "text-gray-900 dark:text-gray-100 font-semibold"
                  : "text-gray-500 dark:text-gray-200"
              )}
            >
              {sender && <span>{sender}:</span>} {lastMessageText}
            </p>
            {isUnread && (
              <span className="w-2 h-2 bg-sky-500 rounded-full ml-auto"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
