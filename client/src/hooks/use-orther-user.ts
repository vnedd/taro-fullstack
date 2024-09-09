import { useMemo } from "react";
import { IConversation } from "@/types/conversation";
import { useAuthStore } from "@/store/auth";
import { IUser } from "@/types/user";

const useOtherUser = (
  conversation: IConversation | { participants: IUser[] }
) => {
  const { profile } = useAuthStore();

  const otherUser = useMemo(() => {
    const currentUserEmail = profile?.email;

    const otherUser = conversation.participants.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [profile?.email, conversation.participants]);

  return otherUser;
};

export default useOtherUser;
