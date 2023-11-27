import mongoose from "mongoose";
import { SaleDocument } from "./sale.types";

const saleSchema = new mongoose.Schema<SaleDocument>(
  {
    employeeId: { type: String, ref: "User", required: true },
    volume: { type: Number, required: true },
    pricePerLitre: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default saleSchema;
