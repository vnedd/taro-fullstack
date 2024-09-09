import BackBtn from "@/components/back-btn";
import UserAvatar from "@/components/user-avatar";

import { IConversation } from "@/types/conversation";
import useOtherUser from "@/hooks/use-orther-user";

interface ChatHeaderProps {
  conversation: IConversation;
}

const ChatHeader = ({ conversation }: ChatHeaderProps) => {
  const otherUser = useOtherUser(conversation);

  return (
    <div className="md:h-16 fixed top-0 md:left-72 left-0 bg-white border-b w-full flex items-center justify-between p-4">
      <div className="flex items-center gap-x-2">
        <div className="md:hidden">
          <BackBtn className="rounded-full" url="/conversations" />
        </div>
        <div className="flex items-center gap-x-3">
          <>
            <UserAvatar
              url={otherUser.avatarUrl}
              className="border-none w-10 h-10"
            />
            <div>
              <p className="font-medium text-sm">{otherUser?.username}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-100 font-normal">
                Active now
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
