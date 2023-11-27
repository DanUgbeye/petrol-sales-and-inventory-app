import { IUserAPIService } from "./api";
import { IUserStorage } from "./storage";
import { IUserStore } from "./store";

export interface IUserModule {
  storage: IUserStorage;
  store: IUserStore;
  api: IUserAPIService;
}
