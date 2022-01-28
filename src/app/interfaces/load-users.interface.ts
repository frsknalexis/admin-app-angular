import { User } from "../models/user.model";

export interface LoadUsers {

  ok: boolean;
  users: User[];
  total: number;
}
