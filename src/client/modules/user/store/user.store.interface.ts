import { IUser } from "../dto/user.dto.interface";

export interface IUserStore {
  data: IUser | null;
  getCurrentUser(): IUser | null;
  setCurentUser(user: IUser | null): void;
}
