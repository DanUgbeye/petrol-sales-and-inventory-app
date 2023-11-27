import mongoose from "mongoose";
import { SaleDocument } from "./sale.types";
import { INVENTORY_TYPE } from "@/global-types/inventory.types";

const saleSchema = new mongoose.Schema<SaleDocument>(
  {
    employeeId: { type: String, ref: "User", required: true },
    inventoryId: { type: String, ref: "Inventory", required: true },
    inventoryType: {
      type: String,
      enum: [INVENTORY_TYPE.FUEL, INVENTORY_TYPE.KEROSENE],
      default: INVENTORY_TYPE.FUEL,
      required: true,
    },
    quantity: { type: Number, required: true },
    pricePerLitre: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default saleSchema;
