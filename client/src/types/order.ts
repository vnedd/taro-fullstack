export enum EOrderStates {
  Unfulfilled = "Unfulfilled",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Returned = "Returned",
  Cancelled = "Cancelled",
}

export enum EPaymentStates {
  Unpaid = "Unpaid",
  Paid = "Paid",
  Refunded = "Refunded",
}

export interface IOrder {
  id: string;
  total: number;
  isPaid: boolean;
  orderState: string;
  paymentState: string;
  customerName: string;
  address: string;
  phoneNumber: string;
  userId: string;
  tracking?: ITracking;
  orderItems: IOrderItem[];
  createdAt: Date;
}

export interface IOrderItem {
  id: string;
  pricePerUnit: number;
  quantity: number;
  styleName: string;
  sizeName: string;
  colorName: string;
  productName: string;
  productImage: string;
  productId: string;
  variantId: string;
  orderId: string;
}

export interface ITracking {
  code: string;
  orderId: string;
}

export interface IShippingInfo {
  address: string;
  phone: string;
  customerName: string;
}

export type ScansDetailType = {
  status: string;
  timestamp: string;
  date_part: string;
  short_date_part: string;
  time_part: string;
  location: string;
};
export type ShippingTimelineType = {
  success?: boolean;
  message: string;
  tracking_number: string;
  summary: string;
  is_delivered: boolean;
  is_exception: boolean;
  carrier: string;
  tracking_url: string;
  origination: string;
  destination: string;
  estimated_delivery: string;
  scans: string[];
  scans_detail: ScansDetailType[];
};
