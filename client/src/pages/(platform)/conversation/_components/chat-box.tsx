import { useEffect, useRef, useState, useCallback } from "react";
import ChatMessage from "./chat-message";
import useConversation from "@/hooks/use-conversation";
import { IMessage } from "@/types/conversation";
import { makeSeenMessage } from "@/services/conversation.service";
import { useQueryClient } from "@tanstack/react-query";
import { pusher } from "@/lib/pusher";

interface ChatBoxProps {
  initialMessages: IMessage[];
}

const ChatBox = ({ initialMessages }: ChatBoxProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const markMessagesSeen = async () => {
      await makeSeenMessage(conversationId);
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    markMessagesSeen();
  }, [conversationId, queryClient]);

  useEffect(() => {
    const channel = pusher.subscribe(`conversation_${conversationId}`);

    const newMessageHandler = (newMessage: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      markMessagesSeen();
    };

    const updateMessageHandler = (updatedMessage: IMessage) => {
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === updatedMessage.id ? updatedMessage : message
        )
      );
    };

    const markMessagesSeen = async () => {
      await makeSeenMessage(conversationId);
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    channel.bind("new_message", newMessageHandler);
    channel.bind("update_message", updateMessageHandler);

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`conversation_${conversationId}`);
    };
  }, [conversationId, queryClient]);

  return (
    <div className="shrink basis-full overflow-y-auto md:pt-20 pt-16">
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          data={message}
          isLastMessage={index === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ChatBox;
