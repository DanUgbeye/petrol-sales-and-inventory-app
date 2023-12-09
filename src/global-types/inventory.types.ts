export const INVENTORY_TYPE = {
  FUEL: "fuel",
  KEROSENE: "kerosene",
} as const;

export type InventoryType =
  (typeof INVENTORY_TYPE)[keyof typeof INVENTORY_TYPE];

export type Inventory = {
  _id: string;
  type: InventoryType;
  quantity: number;
  pricePerLitre: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewInventory = Omit<
  Inventory,
  "_id" | "createdAt" | "updatedAt" | "quantity"
>;

export const INVENTORY_LEVEL = {
  OPTIMAL: "OPTIMAL",
  OK: "OK",
  LOW: "LOW",
} as const;

export type InventoryLevel =
  (typeof INVENTORY_LEVEL)[keyof typeof INVENTORY_LEVEL];
