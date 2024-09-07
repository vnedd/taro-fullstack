import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  IPaginationResponse,
  TOrderOfUserUrlParams,
  TOrderUrlParams,
} from "@/types/response";
import { IOrder } from "@/types/order";
import {
  canceledOrder,
  deleteOrder,
  getAllOrder,
  getOneOrder,
  getOrderByUser,
  updateOrderState,
  updateShipingInfo,
} from "@/services/order.service";

export const useOrders = (
  params: TOrderUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IOrder>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IOrder>, Error>({
    queryKey: ["orders", params],
    queryFn: () => getAllOrder(params),
    ...options,
  });
};

export const useOrder = (id: string) => {
  return useQuery<IOrder | null, Error>({
    queryKey: ["orders", id],
    queryFn: () => getOneOrder(id),
    enabled: !!id,
  });
};

export const useOrderByUser = (
  params: TOrderOfUserUrlParams,
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IOrder>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IOrder>, Error>({
    queryKey: ["orders", params],
    queryFn: () => getOrderByUser(params),
    ...options,
  });
};

export const useUpdateShippingInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShipingInfo,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", variables.orderId],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Update order failed";
      return Promise.reject(errorMessage);
    },
  });
};

export const useUpdateOrderState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderState,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", variables.orderId],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Update order failed";
      return Promise.reject(errorMessage);
    },
  });
};

export const useCanceledOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: canceledOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", id],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Update order failed";
      return Promise.reject(errorMessage);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Delete order failed";
      return Promise.reject(errorMessage);
    },
  });
};
