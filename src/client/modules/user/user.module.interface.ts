import { IUserAdapter } from "./adapter";
import { IUserAPIService } from "./api";
import { IUserEvents } from "./events";
import { IUserModel } from "./model";
import { IUserRepository } from "./repository";
import { IUserStorage } from "./storage";
import { IUserStore } from "./store";

export interface IUserModule {
  storage: IUserStorage;
  store: IUserStore;
  api: IUserAPIService;
  adapter: IUserAdapter;
  repository: IUserRepository;
  model: IUserModel;
  events: IUserEvents;
}
