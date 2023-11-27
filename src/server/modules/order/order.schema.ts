import mongoose from "mongoose";
import { OrderDocument } from "./order.types";
import { ORDER_STATUS } from "@/global-types/order.types";
import { INVENTORY_TYPE } from "@/global-types/inventory.types";

const orderSchema = new mongoose.Schema<OrderDocument>(
  {
    managerId: { type: String, ref: "User", required: true },
    quantity: { type: Number, default: 40_000 },
    type: {
      type: String,
      enum: [INVENTORY_TYPE.FUEL, INVENTORY_TYPE.KEROSENE],
      default: INVENTORY_TYPE.FUEL,
      required: true,
    },
    status: {
      type: String,
      enum: [ORDER_STATUS.COMPLETED, ORDER_STATUS.ONGOING],
      default: ORDER_STATUS.ONGOING,
    },
    pricePerLitre: { type: Number, default: 650 },
  },
  {
    timestamps: true,
  }
);

export default orderSchema;
