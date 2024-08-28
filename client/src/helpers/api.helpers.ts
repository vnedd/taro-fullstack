import { TUrlParams } from "@/types/response";

export function buildUrl(apiPrefix: string, params: TUrlParams): string {
  const queryParams = new URLSearchParams();

  if (params.get_all) {
    queryParams.append("get_all", "true");
  } else {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && key !== "get_all") {
        queryParams.append(key, value.toString());
      }
    });
  }

  return `${apiPrefix}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
}
