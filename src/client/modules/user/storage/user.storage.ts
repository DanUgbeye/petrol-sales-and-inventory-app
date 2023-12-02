import { IPersistentStorage } from "@/client/global-utils/persistent-storage";
import { User } from "@/global-types/user.types";

export class UserStorage {
  private storage: IPersistentStorage;
  private storageKey = "USER";

  constructor(persistentStorage: IPersistentStorage) {
    this.storage = persistentStorage;
  }

  save(data: User | null): void {
    this.storage.save(this.storageKey, data);
  }

  get(): User | null {
    const data = this.storage.retrieve(this.storageKey);
    // validate here
    return data as User | null;
  }

  delete(): void {
    this.storage.delete(this.storageKey);
  }
}
