import { IUserClientData } from "../dto/user.dto.interface";

export interface IUserModel {
  signup(data: IUserClientData): Promise<IUserClientData>;
  login(data: IUserClientData): Promise<IUserClientData>;
  getProfile(): Promise<IUserClientData>;
  updateProfile(data: Partial<IUserClientData>): Promise<IUserClientData>;
  deleteProfile(): Promise<boolean>;
}
