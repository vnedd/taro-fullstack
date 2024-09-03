import axios from "axios";
import { EOrderStates, IOrder, IShippingInfo } from "@/types/order";
import { buildUrl } from "@/helpers/api.helpers";
import { IPaginationResponse, TUrlParams } from "@/types/response";

const API_PREFIX = "/orders";

const getAllOrder = async (
  params: TUrlParams = {}
): Promise<IPaginationResponse<IOrder>> => {
  const url = buildUrl(API_PREFIX, params);
  const response = await axios.get<IPaginationResponse<IOrder>>(url);
  return response.data;
};

const getOneOrder = async (id: string): Promise<IOrder | null> => {
  try {
    const { data } = await axios.get<{ metaData: IOrder }>(
      `${API_PREFIX}/${id}`
    );
    return data.metaData || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const getOrderByUser = async (
  userId: string
): Promise<IPaginationResponse<IOrder>> => {
  const { data } = await axios.get<IPaginationResponse<IOrder>>(
    `${API_PREFIX}/user/${userId}`
  );
  return data;
};

interface IShippingInforUpdate {
  orderId: string;
  shippingInfo: IShippingInfo;
}
const updateShipingInfo = async (
  data: IShippingInforUpdate
): Promise<IOrder> => {
  const response = await axios.patch<IOrder>(
    `${API_PREFIX}/${data.orderId}/shipping-update`,
    {
      shippingInfo: data.shippingInfo,
    }
  );
  return response.data;
};

interface IOrderStateUpdate {
  orderId: string;
  orderState: EOrderStates;
}
const updateOrderState = async (data: IOrderStateUpdate): Promise<IOrder> => {
  const response = await axios.patch<IOrder>(
    `${API_PREFIX}/${data.orderId}/state-update`,
    {
      orderState: data.orderState,
    }
  );
  return response.data;
};

const canceledOrder = async (orderId: string): Promise<IOrder> => {
  const response = await axios.patch<IOrder>(
    `${API_PREFIX}/${orderId}/canceled`
  );
  return response.data;
};

const deleteOrder = async (id: string): Promise<void> => {
  await axios.delete<void>(`${API_PREFIX}/${id}`);
};

export {
  getAllOrder,
  getOrderByUser,
  getOneOrder,
  updateShipingInfo,
  updateOrderState,
  deleteOrder,
  canceledOrder,
};
