import { User } from "@/global-types/user.types";

export interface IUserStorage {
  saveUser(data: User | null): void;
  getUser(): User | null;
  deleteUser(): void;
}
