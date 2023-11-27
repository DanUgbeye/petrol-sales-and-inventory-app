export interface IUser {
  getId(): string;
  getEmail(): string;
  getName(): string;
  getSex(): string;
}

export interface IUserClientData {
  id: string;
  name: string;
  email: string;
  sex: string;
}

export interface IUserServerData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
}
