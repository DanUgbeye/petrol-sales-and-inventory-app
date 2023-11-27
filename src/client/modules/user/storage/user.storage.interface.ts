import { IUser } from "../dto/user.dto.interface";

export interface IUserStorage {
  saveUser(data: IUser | null): void;
  getUser(): IUser | null;
  deleteUser(): void;
}
