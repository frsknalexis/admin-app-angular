import { User } from "../models/user.model";

export interface UserResponse {

  ok: boolean,
  user?: User
}
