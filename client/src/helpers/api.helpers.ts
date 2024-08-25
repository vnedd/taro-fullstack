import { TUrlParams } from "@/types/response";

export function buildUrl(apiPrefix: string, params: TUrlParams): string {
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
