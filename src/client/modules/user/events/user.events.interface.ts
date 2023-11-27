import { IUser } from "../dto/user.dto.interface";

export interface IUserEvents {
  onLogin(effect: (data: IUser) => void): void;
}
