import { AuthData } from "@/global-types/auth.types";
import { makeAutoObservable } from "mobx";

export class AuthStore {
  private auth: AuthData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getAuth() {
    return this.auth;
  }

  setAuth(auth: AuthData | null) {
    this.auth = auth;
  }
}

const authStore = new AuthStore();

export default authStore;
