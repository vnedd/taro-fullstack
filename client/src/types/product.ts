import { ICategory } from "./category";
import { IColor } from "./color";
import { ISize } from "./size";
import { IStyle } from "./style";

export type IProduct = {
  id: string;
  name: string;
  description: string;
  discount?: number;
  isFeatured: boolean;
  images: string[];
  category: ICategory;
  productColors: IColor[];
  productSizes: ISize[];
  productStyles: IStyle[];
  variants: IVariant[];
  createdAt: Date;
  updatedAt: Date;
};

export type IProductLite = {
  id: string;
  name: string;
  description: string;
  discount?: number;
  isFeatured: boolean;
  images: string[];
  category: ICategory;
  productColors: string[];
  productSizes: string[];
  productStyles: string[];
  variants: string[];
  createdAt: Date;
  updatedAt: Date;
};

export interface IVariant {
  id?: string;
  style: string;
  size: string;
  sizeName: string;
  colorName: string;
  styleName: string;
  color: string;
  price: number;
  stock: number;
}
