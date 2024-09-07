import axios, { AxiosError } from "axios";

export const toggleWishlist = async (productId: string) => {
  try {
    const { data } = await axios.post("users/wishlist", { productId });
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
