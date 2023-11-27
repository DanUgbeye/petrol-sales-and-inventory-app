import { PumpDocument } from "@/server/modules/pump/pump.types";
import mongoose from "mongoose";

const pumpSchema = new mongoose.Schema<PumpDocument>(
  {
    name: { type: String, unique: true, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default pumpSchema;
