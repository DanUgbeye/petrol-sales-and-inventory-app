import { UserRole } from "./user.types";

export interface AuthData {
  role: UserRole;
  token: string;
  expiresIn: number;
}
