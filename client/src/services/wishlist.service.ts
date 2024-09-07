import axios, { AxiosError } from "axios";

export const toggleWishlist = async (productId: string) => {
  try {
    const { data } = await axios.post("users/toggle-wishlist", { productId });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Add to wishlist failed"
      );
    }
    throw new Error("Internal error");
  }
};
export const getUserWishlist = async () => {
  try {
    const { data } = await axios.get("users/wishlist");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Get wishlist failed");
    }
    throw new Error("Internal error");
  }
};
