import { IPersistentStorage } from "@/client/global-utils/persistent-storage";
import { IUser } from "../dto";

export class UserStorage {
  private storage: IPersistentStorage;
  private storageKey = "USER";

  constructor(persistentStorage: IPersistentStorage) {
    this.storage = persistentStorage;
  }

  saveUser(data: IUser | null): void {
    this.storage.save(this.storageKey, data);
  }

  getUser(): IUser | null {
    const data = this.storage.retrieve(this.storageKey);
    // validate here
    return data as IUser | null;
  }

  deleteUser(): void {
    this.storage.delete(this.storageKey);
  }
}
