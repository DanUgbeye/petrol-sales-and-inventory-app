import { InventoryType } from "./inventory.types";

export interface Sale {
  _id: string;
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

export type NewSale = {
  type: InventoryType;
  quantity: number;
};
