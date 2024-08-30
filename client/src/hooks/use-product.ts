import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductFeatured,
  getProductLites,
  getProducts,
  updateProduct,
} from "@/services/product.services";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { IProduct, IProductLite } from "@/types/product";

export const useProducts = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IProduct>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IProduct>, Error>({
    queryKey: ["products", JSON.stringify(params)],
    queryFn: () => getProducts(params),
    ...options,
  });
};

export const useProductLites = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IProductLite>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IProductLite>, Error>({
    queryKey: ["products", JSON.stringify(params)],
    queryFn: () => getProductLites(params),
    ...options,
  });
};

export const useProductFeatured = (
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IProductLite>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IProductLite>, Error>({
    queryKey: ["products"],
    queryFn: () => getProductFeatured(),
    ...options,
  });
};

export const useProduct = (id: string) => {
  return useQuery<IProduct | null, Error>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Create product failed";
      return Promise.reject(errorMessage);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Update product failed";
      return Promise.reject(errorMessage);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response.data.message || "Delete product failed";
      return Promise.reject(errorMessage);
    },
  });
};
