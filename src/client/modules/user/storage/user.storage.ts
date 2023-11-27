import { IPersistentStorage } from "@/client/global-utils/persistent-storage";
import { User } from "@/global-types/user.types";

export class UserStorage {
  private storage: IPersistentStorage;
  private storageKey = "USER";

  constructor(persistentStorage: IPersistentStorage) {
    this.storage = persistentStorage;
  }

  saveUser(data: User | null): void {
    this.storage.save(this.storageKey, data);
  }

  getUser(): User | null {
    const data = this.storage.retrieve(this.storageKey);
    // validate here
    return data as User | null;
  }

  deleteUser(): void {
    this.storage.delete(this.storageKey);
  }
}
