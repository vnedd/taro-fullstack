import { TLoginSchema, TRegisterSchema } from "@/schemas/auth";
import { IApiResponse } from "@/types/response";
import { IUser } from "@/types/user";
import axios, { AxiosError } from "axios";

export const login = async (credentials: TLoginSchema) => {
  try {
    const { data } = await axios.post<IApiResponse<IUser>>(
      "/auth/login",
      credentials
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("Internal error!");
  }
};

export const register = async (
  credentials: Omit<TRegisterSchema, "confirmPassword">
) => {
  try {
    const { data } = await axios.post("auth/register", credentials);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Register failed";
      throw new Error(errorMessage);
    }
    throw new Error("Internal error!");
  }
};
export const logout = async () => {
  try {
    const { data } = await axios.post("auth/logout");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("Internal error!");
  }
};

export const loginGoogle = async (code: string) => {
  try {
    const { data } = await axios.post("auth/google", { code });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("Internal error!");
  }
};

export const profileRequest = async () => {
  try {
    const { data } = await axios.get<IApiResponse<IUser>>("/auth/profile");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "Get Profile failed";
      throw new Error(errorMessage);
    }
    throw new Error("Internal error!");
  }
};

export const refreshTokenRequest = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  try {
    const { data } = await axios.post<
      IApiResponse<{ accessToken: string; refreshToken: string }>
    >("/auth/refresh-token", { refreshToken });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "Get Profile failed";
      throw new Error(errorMessage);
    }
    throw new Error("Internal error!");
  }
};