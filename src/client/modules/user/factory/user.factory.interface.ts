import { IUser, IUserClientData } from "../dto";

export interface IUserFactory {
  createUser(data: IUserClientData): IUser;
}
