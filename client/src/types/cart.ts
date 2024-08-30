export type ICartItem = {
  id: string;
  productId: string;
  productImage: string;
  productName: string;
  pricePerUnit: number | undefined;
  variantId: string;
  quantity: number;
  sizeId: string;
  sizeName: string;
  colorId: string;
  colorName: string;
  styleId: string;
  styleName: string;
};
