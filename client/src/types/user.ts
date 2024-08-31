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
  avatar_url?: string;
  role: ERole;
  accessToken: string;
  refreshToken: string;
}
