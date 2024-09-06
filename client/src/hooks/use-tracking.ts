import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTracking } from "@/services/tracking.service";

export const useCreateTracking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTracking,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["trackings"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", variables.orderId],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Create track failed";
      return Promise.reject(errorMessage);
    },
  });
};
