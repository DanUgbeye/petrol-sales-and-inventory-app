import { IPersistentStorage } from "./persistent-storage.interface";

export class LocalStorage implements IPersistentStorage {
  /**
   * saves data to localstorage
   * @param key the key in local storage
   * @param data the data to save
   */
  save(key: string, data: unknown) {
    if (typeof window === "undefined") {
      return false;
    }
    window.localStorage.setItem(key, JSON.stringify(data));
    return true;
  }

  /**
   * gets data from localstorage
   * @param key the key in local storage
   */
  retrieve(key: string): unknown {
    if (typeof window === "undefined") {
      return null;
    }

    const stringifiedData = window.localStorage.getItem(key);
    if (!stringifiedData) return null;

    return JSON.parse(stringifiedData);
  }

  /**
   * deletes data from localstorage
   * @param key the key in local storage
   */
  delete(key: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const stringifiedData = window.localStorage.removeItem(key);
    return true;
  }
}
