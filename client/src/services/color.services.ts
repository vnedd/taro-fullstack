import { buildUrl } from "@/helpers/api.helpers";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { IColor } from "@/types/color";
import axios from "axios";

const API_PREFIX = "/colors";

const getColors = async (
  params: TUrlParams = {}
): Promise<IPaginationResponse<IColor>> => {
  const url = buildUrl(API_PREFIX, params);
  const response = await axios.get<IPaginationResponse<IColor>>(url);
  return response.data;
};

const getColor = async (id: string): Promise<IColor> => {
  const response = await axios.get<IColor>(`${API_PREFIX}/${id}`);
  return response.data;
};

const createColor = async (
  newColor: Omit<IColor, "id" | "createdAt" | "updatedAt">
): Promise<IColor> => {
  const response = await axios.post<IColor>(API_PREFIX, newColor);
  return response.data;
};

const updateColor = async (
  updatedColor: Omit<IColor, "createdAt" | "updatedAt">
): Promise<IColor> => {
  const response = await axios.patch<IColor>(
    `${API_PREFIX}/${updatedColor.id}`,
    updatedColor
  );
  return response.data;
};

const deleteColor = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_PREFIX}/${id}`);
};

export { getColors, getColor, createColor, updateColor, deleteColor };
