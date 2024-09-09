import { useConversationById } from "@/hooks/use-conversation";
import { useParams } from "react-router-dom";
import ChatHeader from "./_components/chat-header";
import ChatBox from "./_components/chat-box";
import ChatInput from "./_components/chat-input";

const ConversationsPage = () => {
  const params = useParams();

  const { data: conversation, isLoading } = useConversationById(
    params.conversationId!
  );

  if (isLoading || !conversation) {
    return null;
  }

  return (
    <div className="relative w-full">
      <ChatHeader conversation={conversation?.metaData} />
      <ChatBox initialMessages={conversation?.metaData.messages} />
      <ChatInput conversationId={conversation.metaData.id} />
    </div>
  );
};

export default ConversationsPage;
