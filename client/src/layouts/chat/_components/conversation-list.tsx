import useConversation from "@/hooks/use-conversation";
import { IConversation, IMessage } from "@/types/conversation";
import ConversationBox from "./conversation-box";
import { pusher } from "@/lib/pusher";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

interface ConversationListProps {
  data: IConversation[];
}

interface PusherConversationData {
  id: string;
  messages: IMessage[];
}

const ConversationList = ({ data }: ConversationListProps) => {
  const [conversations, setConversations] = useState<IConversation[]>(data);
  const { profile } = useAuthStore();
  useEffect(() => {
    if (!profile?.id) return;

    const channel = pusher.subscribe(`conversations_user_${profile.id}`);

    const updateConversationHandler = (
      updatedConversation: PusherConversationData
    ) => {
      console.log(updatedConversation);
      setConversations((currentConversations) =>
        currentConversations.map((conversation) =>
          conversation.id === updatedConversation.id
            ? { ...conversation, messages: updatedConversation.messages }
            : conversation
        )
      );
    };

    channel.bind("update_conversation", updateConversationHandler);

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`conversations_user_${profile.id}`);
    };
  }, [profile]);

  const { conversationId } = useConversation();

  return (
    <div className="p-4 pt-0">
      <h3 className="text-lg font-semibold pb-3">Messages</h3>
      <div className="flex flex-col space-y-3">
        {conversations?.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
