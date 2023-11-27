import { IUser, IUserServerData } from "../dto/user.dto.interface";

export interface IUserAPIService {
  signup(data: IUserServerData): Promise<IUserServerData>;
  login(data: IUserServerData): Promise<IUserServerData>;
  getProfile(): Promise<IUserServerData>;
  updateProfile(data: Partial<IUserServerData>): IUserServerData;
  deleteProfile(): Promise<boolean>;
}
