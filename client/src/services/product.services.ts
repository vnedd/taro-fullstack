import { buildUrl } from "@/helpers/api.helpers";
import { TProductSchema } from "@/schemas/product.schema";
import { IProduct } from "@/types/product";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import axios from "axios";

const API_PREFIX = "/products";

const getProducts = async (
  params: TUrlParams = {}
): Promise<IPaginationResponse<IProduct>> => {
  const url = buildUrl(API_PREFIX, params);
  const { data } = await axios.get<IPaginationResponse<IProduct>>(url);
  return data;
};

const getProduct = async (id: string): Promise<IProduct | null> => {
  try {
    const { data } = await axios.get<{ metaData: IProduct }>(
      `${API_PREFIX}/${id}`
    );
    return data.metaData || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const createProduct = async (newProduct: TProductSchema): Promise<IProduct> => {
  const { data } = await axios.post<IProduct>(API_PREFIX, newProduct);
  return data;
};

const updateProduct = async (
  updatedProduct: TProductSchema
): Promise<IProduct> => {
  const { data } = await axios.patch<IProduct>(
    `${API_PREFIX}/${updatedProduct.id}`,
    updatedProduct
  );
  return data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_PREFIX}/${id}`);
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
