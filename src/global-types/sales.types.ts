import { InventoryType } from "./inventory.types";

export interface Sale {
  employeeId: string;
  inventoryId: string;
  inventoryType: InventoryType;
  quantity: number;
  pricePerLitre: number;
}
