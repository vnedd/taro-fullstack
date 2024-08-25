import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  createColor,
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from "@/services/color.services";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { IColor } from "@/types/color";

export const useColors = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IColor>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IColor>, Error>({
    queryKey: ["colors", params],
    queryFn: () => getColors(params),
    ...options,
  });
};

export const useColor = (id: string) => {
  return useQuery<IColor>({
    queryKey: ["color", id],
    queryFn: () => getColor(id),
    enabled: !!id,
  });
};

export const useCreateColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });
};

export const useUpdateColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateColor,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      queryClient.invalidateQueries({ queryKey: ["color", variables.id] });
    },
  });
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });
};
