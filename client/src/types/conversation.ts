import { IUser } from "./user";

export interface IConversation {
  id: string;
  participants: IUser[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id: string;
  body?: string;
  image?: string;
  conversationId: IConversation;
  senderId: IUser;
  isSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IMessageFormData {
  body?: string;
  image?: string;
  conversationId: string;
  senderId: string;
}
