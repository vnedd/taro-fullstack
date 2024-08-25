import { buildUrl } from "@/helpers/api.helpers";
import { TCategorySchema } from "@/schemas/category.schema";
import { ICategory } from "@/types/category";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import axios from "axios";

const API_PREFIX = "/categories";

const getCategories = async (
  params: TUrlParams = {}
): Promise<IPaginationResponse<ICategory>> => {
  const url = buildUrl(API_PREFIX, params);
  const { data } = await axios.get<IPaginationResponse<ICategory>>(url);
  return data;
};

const getCategory = async (id: string): Promise<ICategory> => {
  const { data } = await axios.get<ICategory>(`${API_PREFIX}/${id}`);
  return data;
};

const createCategory = async (
  newCategory: TCategorySchema
): Promise<ICategory> => {
  const { data } = await axios.post<ICategory>(API_PREFIX, newCategory);
  return data;
};

const updateCategory = async (
  updatedCategory: TCategorySchema & { id: string }
): Promise<ICategory> => {
  const { data } = await axios.patch<ICategory>(
    `${API_PREFIX}/${updatedCategory.id}`,
    updatedCategory
  );
  return data;
};

const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_PREFIX}/${id}`);
};

export {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};
