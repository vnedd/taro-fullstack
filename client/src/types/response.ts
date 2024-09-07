import { EOrderStates, EPaymentStates } from "./order";

export interface IApiResponse<T> {
  message: string;
  statusCode: number;
  metaData: T;
}

export interface IPaginationResponse<T> {
  message: string;
  statusCode: number;
  metaData: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
}

export type TUrlParams = {
  _page?: number;
  _limit?: number;
  name?: string;
  get_all?: boolean;
  categoryId?: string;
};

export type TOrderUrlParams = {
  _page?: number;
  _limit?: number;
  get_all?: boolean;
  paymentState?: EPaymentStates;
  orderState?: EOrderStates;
  start_date?: Date;
  end_date?: Date;
};

export type TOrderOfUserUrlParams = TOrderUrlParams & {
  userId: string;
};
