export interface IApiResponse<T> {
  message: string;
  statusCode: number;
  metaData: T;
}
