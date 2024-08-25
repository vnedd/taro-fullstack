import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  createStyle,
  deleteStyle,
  getStyle,
  getStyles,
  updateStyle,
} from "@/services/style.services";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { IStyle } from "@/types/style";

export const useStyles = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IStyle>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IStyle>, Error>({
    queryKey: ["styles", params],
    queryFn: () => getStyles(params),
    ...options,
  });
};

export const useStyle = (id: string) => {
  return useQuery<IStyle>({
    queryKey: ["style", id],
    queryFn: () => getStyle(id),
    enabled: !!id,
  });
};

export const useCreateStyle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["styles"] });
    },
  });
};

export const useUpdateStyle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStyle,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["styles"] });
      queryClient.invalidateQueries({ queryKey: ["style", variables.id] });
    },
  });
};

export const useDeleteStyle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["styles"] });
    },
  });
};
