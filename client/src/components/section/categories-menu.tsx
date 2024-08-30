import { ICategory } from "@/types/category";
import { Link } from "react-router-dom";

interface CategoriesMenuProps {
  data: ICategory[];
}

const CategoriesMenu = ({ data }: CategoriesMenuProps) => {
  const renderCategoryItem = (item: ICategory) => (
    <Link
      to={`/shop?categoryId=${item.id}`}
      key={item.id}
      className="relative group"
    >
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <img
          className="rounded-md group-hover:scale-125 duration-700 transition-all object-cover w-full h-full border"
          src={item.imageUrl || ""}
          alt={item.name}
        />
        <p className="font-bold text-xl uppercase text-white italic absolute bottom-6 left-6">
          {item.name}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
      <div className="grid grid-cols-2 md:gap-6 gap-4 lg:h-[500px] h-[350px]">
        {data.slice(0, 2).map(renderCategoryItem)}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 md:gap-6 gap-4 lg:h-[500px] h-[350px]">
        {data.slice(2, 6).map(renderCategoryItem)}
      </div>
    </div>
  );
};

export default CategoriesMenu;
