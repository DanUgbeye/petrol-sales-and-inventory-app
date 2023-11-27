export interface IPersistentStorage {
  save(key: string, data: unknown): boolean;
  retrieve(key: string): unknown;
  delete(key: string): boolean;
}
