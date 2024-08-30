import { cn } from "@/lib/utils";
import { IProductLite } from "@/types/product";
import ProductItem from "./product-item";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
type Props = {
  data: IProductLite[] | undefined;
  className?: string;
};

const ProductList = ({ data, className }: Props) => {
  return (
    <div className={cn("grid gap-2", className)}>
      {data?.map((product) => (
        <ProductItem className="fade-in-item" key={product.id} item={product} />
      ))}
    </div>
  );
};

export default ProductList;
