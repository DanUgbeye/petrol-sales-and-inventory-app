export const INVENTORY_TYPE = {
  FUEL: "fuel",
  KEROSENE: "kerosene",
} as const;

export type InventoryType =
  (typeof INVENTORY_TYPE)[keyof typeof INVENTORY_TYPE];

export interface Inventory {
  type: InventoryType;
  quantity: number;
  pricePerLitre: number;
}
