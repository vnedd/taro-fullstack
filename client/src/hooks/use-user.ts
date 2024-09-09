import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IPaginationResponse, TUrlParams } from "@/types/response";
import { IUser } from "@/types/user";
import { getAllUsers } from "@/services/auth.service";

export const useUsers = (
  params: TUrlParams = {},
  options?: Omit<
    UseQueryOptions<IPaginationResponse<IUser>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<IPaginationResponse<IUser>, Error>({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
    ...options,
  });
};