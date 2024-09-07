import { IProductLite } from "./product";

export enum ERole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface IUser {
  id: string;
  username: string;
  password?: string;
  google_id?: string;
  email: string;
  avatarUrl?: string;
  role: ERole;
  wishlist: IProductLite[];
  accessToken: string;
  refreshToken: string;
}
