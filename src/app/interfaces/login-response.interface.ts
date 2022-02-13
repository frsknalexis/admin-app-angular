import { User } from "../models/user.model";
import { MenuResponse } from "./menu-response.interface";

export interface LoginResponse {

  ok: boolean;
  token: string;
  user?: User;
  menu: MenuResponse[];
}
