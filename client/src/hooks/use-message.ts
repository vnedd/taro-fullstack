import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "@/services/message.service";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({
        queryKey: ["conversations", variables.conversationId],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Create message failed";
      return Promise.reject(errorMessage);
    },
  });
};
