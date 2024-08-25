import { buildUrl } from "@/helpers/api.helpers";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { IStyle } from "@/types/style";
import axios from "axios";

const API_PREFIX = "/styles";

const getStyles = async (
  params: TUrlParams = {}
): Promise<IPaginationResponse<IStyle>> => {
  const url = buildUrl(API_PREFIX, params);
  const response = await axios.get<IPaginationResponse<IStyle>>(url);
  return response.data;
};

const getStyle = async (id: string): Promise<IStyle> => {
  const response = await axios.get<IStyle>(`${API_PREFIX}/${id}`);
  return response.data;
};

const createStyle = async (
  newStyle: Omit<IStyle, "id" | "createdAt" | "updatedAt">
): Promise<IStyle> => {
  const response = await axios.post<IStyle>(API_PREFIX, newStyle);
  return response.data;
};

const updateStyle = async (
  updatedStyle: Omit<IStyle, "createdAt" | "updatedAt">
): Promise<IStyle> => {
  const response = await axios.patch<IStyle>(
    `${API_PREFIX}/${updatedStyle.id}`,
    updatedStyle
  );
  return response.data;
};

const deleteStyle = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_PREFIX}/${id}`);
};

export { getStyles, getStyle, createStyle, updateStyle, deleteStyle };
