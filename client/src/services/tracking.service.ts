import { ITracking } from "@/types/order";
import axios from "axios";

const API_PREFIX = "/trackings";

const createTracking = async (
  newTrack: Omit<ITracking, "id" | "createdAt" | "updatedAt">
): Promise<ITracking> => {
  const response = await axios.post<ITracking>(API_PREFIX, newTrack);
  return response.data;
};

export { createTracking };
