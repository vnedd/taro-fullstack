import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IApiResponse, IPaginationResponse } from "@/types/response";
import { IConversation } from "@/types/conversation";
import {
  createConversation,
  getConversationById,
  getConversationByUser,
} from "@/services/conversation.service";

export const useConversationByUser = () => {
  return useQuery<IPaginationResponse<IConversation>, Error>({
    queryKey: ["conversations"],
    queryFn: () => getConversationByUser(),
  });
};

export const useConversationById = (id: string) => {
  return useQuery<IApiResponse<IConversation>, Error>({
    queryKey: ["conversations", id],
    queryFn: () => getConversationById(id),
    enabled: !!id,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
