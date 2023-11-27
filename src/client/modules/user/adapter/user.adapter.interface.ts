import { IUserClientData, IUserServerData } from "../dto/user.dto.interface";

export interface IUserAdapter {
  clientToServer(data: IUserClientData): IUserServerData;
  serverToClient(data: IUserServerData): IUserClientData;
}
