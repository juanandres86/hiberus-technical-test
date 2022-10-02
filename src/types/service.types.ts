import { User } from "./user.types";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export type UserInfoResponse = {
  email: string;
  name: string;
  surname: string;
  password: string;
  id: string;
}

export type ServiceResponse = {
  success: boolean;
  message: string;
  data?: LoginResponse | UserInfoResponse | User[] | User;
}