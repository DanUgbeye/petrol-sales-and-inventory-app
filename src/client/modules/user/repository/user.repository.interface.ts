import { IUser, IUserClientData } from "../dto/user.dto.interface";

export interface IUserRepository {
  signup(data: IUserClientData): Promise<IUserClientData>;
  login(data: IUserClientData): Promise<IUserClientData>;
  getProfile(): Promise<IUserClientData>;
  updateProfile(data: Partial<IUserClientData>): Promise<IUserClientData>;
  deleteProfile(): Promise<boolean>;
}
