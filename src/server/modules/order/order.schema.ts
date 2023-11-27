import mongoose from "mongoose";
import { OrderDocument } from "./order.types";

const orderSchema = new mongoose.Schema<OrderDocument>(
  {
    employeeId: { type: String, ref: "User", required: true },
    volume: { type: Number, required: true },
    pricePerLitre: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default orderSchema;
