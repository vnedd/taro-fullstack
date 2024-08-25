import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  createSize,
  deleteSize,
  getSize,
  getSizes,
  updateSize,
} from "@/services/size.services";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { ISize } from "@/types/size";

export const useSizes = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<ISize>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<ISize>, Error>({
    queryKey: ["sizes", params],
    queryFn: () => getSizes(params),
    ...options,
  });
};

export const useSize = (id: string) => {
  return useQuery<ISize>({
    queryKey: ["size", id],
    queryFn: () => getSize(id),
    enabled: !!id,
  });
};

export const useCreateSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });
};

export const useUpdateSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSize,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      queryClient.invalidateQueries({ queryKey: ["size", variables.id] });
    },
  });
};

export const useDeleteSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });
};
