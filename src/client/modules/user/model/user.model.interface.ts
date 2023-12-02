import { User } from "@/global-types/user.types";

export interface IUserModel {
  signup(data: User): Promise<User>;
  login(data: User): Promise<User>;
  getProfile(): Promise<User>;
  updateProfile(data: Partial<User>): Promise<User>;
  deleteProfile(): Promise<boolean>;
}
