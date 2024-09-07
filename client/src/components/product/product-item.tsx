import {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  forwardRef,
} from "react";
import { Badge } from "../ui/badge";
import { WiStars } from "react-icons/wi";
import { cn, formatter } from "@/lib/utils";
import { Link } from "react-router-dom";
import { IProductLite } from "@/types/product";
import ToggleWishlist from "../toggle-wishlist";
import { useAuthStore } from "@/store/auth";

type Props = {
  item: IProductLite;
  className?: string;
};

const ProductItem = memo(
  forwardRef<HTMLDivElement, Props>(({ item, className }, ref) => {
    const [thumb, setThumb] = useState<string>(item.images[0]);
    const thumbRef = useRef<HTMLDivElement>(null);
    const { isAuth } = useAuthStore();

    const handleMouseMove = useCallback(() => {
      if (item.images[1]) {
        setThumb(item.images[1]);
      }
    }, [item.images]);

    const handleMouseLeave = useCallback(() => {
      setThumb(item.images[0]);
    }, [item.images]);

    useEffect(() => {
      const currentThumb = thumbRef.current;
      if (currentThumb) {
        currentThumb.addEventListener("mousemove", handleMouseMove);
        currentThumb.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          currentThumb.removeEventListener("mousemove", handleMouseMove);
          currentThumb.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, [handleMouseMove, handleMouseLeave]);

    const renderPrice = useCallback(() => {
      const basePrice = 20.99;
      if (item.discount) {
        const discountedPrice = basePrice - (basePrice / 100) * item.discount;
        return (
          <div className="flex items-end space-x-1">
            <span className="line-through text-sm font-medium text-muted-foreground">
              {formatter.format(basePrice)}
            </span>
            <span className="font-bold text-primary  md:text-lg text-base">
              {formatter.format(discountedPrice)}
            </span>
          </div>
        );
      }
      return (
        <span className="font-bold text-primary  md:text-lg text-base">
          {formatter.format(basePrice)}
        </span>
      );
    }, [item.discount]);

    return (
      <div ref={ref} className={cn("p-2 rounded-md cursor-pointer", className)}>
        <div
          ref={thumbRef}
          className="aspect-[6/8] group relative overflow-hidden transition"
        >
          <Link to={`/product/${item.id}`}>
            <img
              src={thumb}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </Link>
          {item.isFeatured && (
            <div className="absolute flex space-x-2 top-2 left-2">
              <Badge variant="default" className="font-light text-xs">
                <WiStars className="w-3 h-3" />
                Featured
              </Badge>
            </div>
          )}
          {isAuth && (
            <div className="absolute right-2 top-2">
              <ToggleWishlist productId={item.id} />
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-col space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-200">
            {item.category.name}
          </p>
          <Link
            to={`/product/${item.id}`}
            className="font-semibold text-sm line-clamp-1 capitalize"
          >
            {item.name}
          </Link>
          {renderPrice()}
        </div>
      </div>
    );
  })
);

ProductItem.displayName = "ProductItem";

export default ProductItem;
