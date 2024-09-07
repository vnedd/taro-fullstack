import { useAuthStore } from "@/store/auth";

export const useCheckWishlist = () => {
  const { profile } = useAuthStore();

  return (productId: string): boolean => {
    if (!profile || !profile.wishlist) {
      return false;
    }
    return profile.wishlist.some((product) => product.id === productId);
  };
};
