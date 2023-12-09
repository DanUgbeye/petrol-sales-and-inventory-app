import { InventoryType } from "./inventory.types";

export const ORDER_STATUS = {
  ONGOING: "ongoing",
  COMPLETED: "completed",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface Order {
  _id: string;
  managerId: string;
  type: InventoryType;
  quantity: number;
  pricePerLitre: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type NewOrder = {
  type: InventoryType;
  quantity: number;
  pricePerLitre: number;
};
