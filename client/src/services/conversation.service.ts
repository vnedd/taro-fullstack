import { IConversation } from "@/types/conversation";
import { IApiResponse, IPaginationResponse } from "@/types/response";
import axios from "axios";

const API_PREFIX = "/conversations";

const createConversation = async (
  participants: string[]
): Promise<IApiResponse<IConversation>> => {
  const response = await axios.post<IApiResponse<IConversation>>(API_PREFIX, {
    participants,
  });
  return response.data;
};

const getConversationByUser = async (): Promise<
  IPaginationResponse<IConversation>
> => {
  const response = await axios.get<IPaginationResponse<IConversation>>(
    `${API_PREFIX}/user`
  );
  return response.data;
};

const getConversationById = async (
  id: string
): Promise<IApiResponse<IConversation>> => {
  const response = await axios.get<IApiResponse<IConversation>>(
    `${API_PREFIX}/${id}`
  );
  return response.data;
};

const makeSeenMessage = async (
  id: string
): Promise<IApiResponse<{ success: string }>> => {
  const response = await axios.post<IApiResponse<{ success: string }>>(
    `${API_PREFIX}/${id}/seen`
  );
  return response.data;
};

export {
  createConversation,
  getConversationByUser,
  getConversationById,
  makeSeenMessage,
};
