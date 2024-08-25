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
  page?: number;
  limit?: number;
  name?: string;
  getAll?: boolean;
  categoryId?: string;
};
