import { IPersistentStorage } from "@/client/global-utils/persistent-storage";
import { AuthData } from "@/global-types/auth.types";

export class AuthStorage {
  private storage: IPersistentStorage;
  private storageKey = "AUTH";

  constructor(persistentStorage: IPersistentStorage) {
    this.storage = persistentStorage;
  }

  save(data: AuthData | null): void {
    this.storage.save(this.storageKey, data);
  }

  get(): AuthData | null {
    const data = this.storage.retrieve(this.storageKey);
    // validate here
    return data as AuthData | null;
  }

  delete(): void {
    this.storage.delete(this.storageKey);
  }
}
