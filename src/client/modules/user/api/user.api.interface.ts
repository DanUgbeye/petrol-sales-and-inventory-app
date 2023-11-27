import { User } from "@/global-types/user.types";

export interface IUserAPIService {
  signup(data: User): Promise<User>;
  login(data: User): Promise<User>;
  getProfile(): Promise<User>;
  updateProfile(data: Partial<User>): User;
  deleteProfile(): Promise<boolean>;
}
