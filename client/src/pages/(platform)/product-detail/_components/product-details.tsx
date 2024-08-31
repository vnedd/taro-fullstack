import { useCallback, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

import { Badge } from "@/components/ui/badge";
import useStore from "@/hooks/use-store";
import { useCart } from "@/hooks/use-cart";
import SizeSelect from "./size-select";
import ColorSelect from "./color-select";
import TypeSelect from "./style-select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCartSheetStore } from "@/hooks/use-cart-sheet";
import { IProduct, IVariant } from "@/types/product";
import { IColor } from "@/types/color";
import { ISize } from "@/types/size";
import { IStyle } from "@/types/style";
import { Link } from "react-router-dom";
import { formatter } from "@/lib/utils";
import Description from "./description";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: IProduct;
};
const ProductDetails = ({ data }: Props) => {
  const cart = useStore(useCart, (s) => s);
  const cartSheet = useStore(useCartSheetStore, (s) => s);
  const [color, setColor] = useState<IColor | undefined>();
  const [size, setSize] = useState<ISize | undefined>();
  const [style, setStyle] = useState<IStyle | undefined>();

  const [variant, setVariant] = useState<IVariant>(() => {
    const minPriceItem = data.variants.reduce((min, item) => {
      return item.price < min.price ? item : min;
    }, data.variants[0]);
    return { ...minPriceItem, quantity: minPriceItem.stock };
  });

  useEffect(() => {
    const variant = data.variants.find(
      (vari) =>
        vari.size === size?.id &&
        vari.color === color?.id &&
        vari.style === style?.id
    );
    if (variant) {
      setVariant({ ...variant, stock: variant.stock });
    }
  }, [size, color, style, data.variants]);

  const handleSelectColor = (color: IColor | undefined) => {
    setColor(color);
  };

  const handleSelectSize = (size: ISize | undefined) => {
    setSize(size);
  };

  const handleSelectStyle = (style: IStyle | undefined) => {
    setStyle(style);
  };

  const handleAddToCart = () => {
    if (!color) {
      toast.error("Please select a color");
      return false;
    }
    if (!size) {
      toast.error("Please select a size");
      return false;
    }
    if (!style) {
      toast.error("Please select a style");
      return false;
    }
    cart?.addItem({
      id: color.id + "-" + size.id + "-" + style.id,
      colorId: color.id,
      colorName: color.name,
      sizeId: size.id,
      sizeName: size.name,
      styleId: style.id,
      styleName: style.name,
      pricePerUnit: variant.price,
      productId: data.id,
      productImage: data.images[0],
      productName: data.name,
      quantity: 1,
      variantId: variant.id!,
    });
    cartSheet?.onOpen();
  };

  const renderPrice = useCallback(() => {
    const basePrice = 20.99;
    if (data.discount) {
      const discountedPrice = basePrice - (basePrice / 100) * data.discount;
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
  }, [data.discount]);

  return (
    <div>
      <Link
        to={`/shop?categoryId=${data.category.id}`}
        className="font-normal text-gray-400 dark:text-gray-200 text-sm italic"
      >
        <Badge>Clothings/{data.category.name}</Badge>
      </Link>
      <div className="mt-2 flex flex-col md:space-y-6 space-y-4">
        <div className="md:space-y-6 space-y-4">
          <h3 className="md:font-extrabold font-bold md:text-2xl text-xl">
            {data.name}
          </h3>
          {renderPrice()}
        </div>
        <Description desc={data.description} />
        <Separator className="w-full " />
        <ColorSelect
          colors={data.productColors.map((color) => color)}
          color={color}
          onSelect={handleSelectColor}
        />
        <SizeSelect
          sizes={data.productSizes.map((size) => size)}
          size={size}
          onSelect={handleSelectSize}
        />
        <TypeSelect
          onSelect={handleSelectStyle}
          style={style}
          styles={data.productStyles.map((style) => style)}
        />
        <div className="flex items-center lg:space-x-6 space-x-3">
          <Button
            onClick={handleAddToCart}
            className="md:py-8 py-5 w-full"
            variant={"default"}
          >
            <FiShoppingCart className="w-4 h-4 mr-2" />
            <span className="uppercase">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
