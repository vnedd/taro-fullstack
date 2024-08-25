export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  getAll?: boolean;
  [key: string]: any;
}

export function buildUrl(apiPrefix: string, params: QueryParams): string {
  const queryParams = new URLSearchParams();

  if (params.getAll) {
    queryParams.append("getAll", "true");
  } else {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && key !== "getAll") {
        queryParams.append(key, value.toString());
      }
    });
  }

  return `${apiPrefix}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
}
