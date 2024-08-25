import { buildUrl } from "@/helpers/api.helpers";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { ISize } from "@/types/size";
import axios from "axios";

const API_PREFIX = "/sizes";

const getSizes = async (
  params: TUrlParams = {}
): Promise<IPaginationResponse<ISize>> => {
  const url = buildUrl(API_PREFIX, params);
  const response = await axios.get<IPaginationResponse<ISize>>(url);
  return response.data;
};

const getSize = async (id: string): Promise<ISize> => {
  const response = await axios.get<ISize>(`${API_PREFIX}/${id}`);
  return response.data;
};

const createSize = async (
  newSize: Omit<ISize, "id" | "createdAt" | "updatedAt">
): Promise<ISize> => {
  const response = await axios.post<ISize>(API_PREFIX, newSize);
  return response.data;
};

const updateSize = async (
  updatedSize: Omit<ISize, "createdAt" | "updatedAt">
): Promise<ISize> => {
  const response = await axios.patch<ISize>(
    `${API_PREFIX}/${updatedSize.id}`,
    updatedSize
  );
  return response.data;
};

const deleteSize = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_PREFIX}/${id}`);
};

export { getSizes, getSize, createSize, updateSize, deleteSize };
