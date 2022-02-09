import { User } from "../models/user.model";

export interface LoginResponse {

  ok: boolean,
  token: string;
  user?: User
}