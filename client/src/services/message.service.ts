import { IMessage, IMessageFormData } from "@/types/conversation";
import { IApiResponse } from "@/types/response";
import axios from "axios";

const API_PREFIX = "/messages";

export const createMessage = async (
  data: IMessageFormData
): Promise<IApiResponse<IMessage>> => {
  const response = await axios.post<IApiResponse<IMessage>>(API_PREFIX, data);
  return response.data;
};
