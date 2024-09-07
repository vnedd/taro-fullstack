import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useCheckWishlist } from "@/hooks/use-check-wishlist";
import { toggleWishlist } from "@/services/wishlist.service";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
interface ToggleWishlistProps {
  productId: string;
}

const ToggleWishlist = ({ productId }: ToggleWishlistProps) => {
  const { isAuth, getProfile } = useAuthStore();
  const checkWishlist = useCheckWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      const inWishlist = checkWishlist(productId);
      setIsInWishlist(inWishlist);
    }
  }, [productId, isAuth, checkWishlist]);

  const handleToggleWishlist = async () => {
    if (!isAuth) {
      toast.error("Please login to add to wishlist");
      return;
    }

    setIsLoading(true);
    try {
      await toggleWishlist(productId);
      await getProfile();
      setIsInWishlist(false);
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={handleToggleWishlist}
      disabled={isLoading}
    >
      {isInWishlist ? (
        <RiHeartFill className="w-5 h-5 text-destructive" />
      ) : (
        <RiHeartLine className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ToggleWishlist;