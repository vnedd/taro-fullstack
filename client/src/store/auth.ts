import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "@/types/user";
import { TLoginSchema, TRegisterSchema } from "@/schemas/auth";
import {
  login,
  loginGoogle,
  logout,
  profileRequest,
  refreshTokenRequest,
  register,
} from "@/services/auth.service";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { checkToken } from "@/lib/checktoken";

type AuthState = {
  profile: IUser | null;
  isAuth: boolean;
  errors: string | null;
  isLoading: boolean;
  register: (
    data: Omit<TRegisterSchema, "confirmPassword">,
    onSuccess?: () => void
  ) => Promise<void>;
  login: (data: TLoginSchema, onSuccess?: () => void) => Promise<void>;
  loginWithGoogle: (code: string, onSuccess?: () => void) => Promise<void>;
  getProfile: () => Promise<void>;
  logout: (onSuccess?: () => void) => Promise<void>;
  cleanErrors: () => void;
};

const handleError = (error: any, defaultMessage: string) => {
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || defaultMessage
      : defaultMessage;
  return errorMessage;
};

const storeApi: StateCreator<AuthState> = (set, get) => ({
  profile: null,
  isAuth: false,
  errors: null,
  isLoading: false,

  register: async (
    data: Omit<TRegisterSchema, "confirmPassword">,
    onSuccess?: () => void
  ) => {
    set({ isLoading: true, errors: null });
    try {
      await register(data);
      toast.success("Register successful");
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = handleError(error, "Registration failed");
      set({ errors: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data: TLoginSchema, onSuccess?: () => void) => {
    set({ isLoading: true, errors: null });
    try {
      const res = await login(data);
      set({ isAuth: true });
      localStorage.setItem("accessToken", res.metaData.accessToken);
      localStorage.setItem("refreshToken", res.metaData.refreshToken);
      toast.success("Login successful");
      await get().getProfile();
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = handleError(error, "Login failed");
      set({ errors: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithGoogle: async (code: string, onSuccess?: () => void) => {
    set({ isLoading: true, errors: null });
    try {
      const res = await loginGoogle(code);
      set({ isAuth: true });
      localStorage.setItem("accessToken", res.metaData.accessToken);
      localStorage.setItem("refreshToken", res.metaData.refreshToken);
      toast.success("Google login successful");
      await get().getProfile();
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = handleError(error, "Google login failed");
      set({ errors: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  getProfile: async () => {
    set({ isLoading: true });

    try {
      let accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        return;
      }

      if (!checkToken(accessToken) && checkToken(refreshToken)) {
        const { metaData } = await refreshTokenRequest({ refreshToken });
        accessToken = metaData.accessToken;
        localStorage.setItem("accessToken", accessToken);
      }

      const profileData = await profileRequest();
      set({ profile: profileData.metaData, isAuth: true, errors: null });
    } catch (error) {
      console.error("Profile fetch error:", error);
      set({
        errors: "Failed to fetch profile. Please login again.",
        isAuth: false,
        profile: null,
      });
      get().logout();
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async (onSuccess?: () => void) => {
    set({ isLoading: true });

    try {
      await logout();
      set({ profile: null, isAuth: false, errors: null });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully");
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = handleError(error, "Logout failed");
      set({ errors: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  cleanErrors: () => set({ errors: null }),
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: "auth-storage",
      partialize: (state) => ({ isAuth: state.isAuth, profile: state.profile }),
    })
  )
);
