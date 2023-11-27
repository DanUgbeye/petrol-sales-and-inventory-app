import mongoose from "mongoose";
import { InventoryDocument } from "./inventory.types";
import { INVENTORY_TYPE } from "@/global-types/inventory.types";

const inventorySchema = new mongoose.Schema<InventoryDocument>(
  {
    type: {
      type: String,
      enum: [INVENTORY_TYPE.FUEL, INVENTORY_TYPE.KEROSENE],
      default: INVENTORY_TYPE.FUEL,
      required: true,
    },
    quantity: { type: Number, required: true, default: 0 },
    pricePerLitre: { type: Number, required: true, default: 600 },
  },
  {
    timestamps: true,
  }
);

export default inventorySchema;
