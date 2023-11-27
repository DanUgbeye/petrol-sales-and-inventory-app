import { User } from "@/global-types/user.types";

export interface IUserStore {
  data: User | null;
  getCurrentUser(): User | null;
  setCurentUser(user: User | null): void;
}
