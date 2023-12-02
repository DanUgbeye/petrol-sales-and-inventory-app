import { User } from "@/global-types/user.types";
import { makeAutoObservable } from "mobx";

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User | null) {
    this.user = user;
  }
}

const userStore = new UserStore();

export default userStore;
