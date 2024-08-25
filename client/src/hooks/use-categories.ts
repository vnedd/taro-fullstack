import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "@/services/category.services";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { ICategory } from "@/types/category";

const useCategories = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<ICategory>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
    ...options,
  });
};

const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
    },
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export {
  useCategories,
  useCategory,
  useUpdateCategory,
  useCreateCategory,
  useDeleteCategory,
};
