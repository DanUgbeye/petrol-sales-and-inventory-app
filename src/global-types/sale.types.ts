import { InventoryType } from "./inventory.types";

export interface Sale {
  employeeId: string;
  inventoryId: string;
  inventoryType: InventoryType;
  quantity: number;
  pricePerLitre: number;
  createdAt: string;
  updatedAt: string;
}

export type SaleStat = {
  quantity: number;
  amount: number;
};

export type AppSalesStat = {
  total: SaleStat;
  month: SaleStat;
};
