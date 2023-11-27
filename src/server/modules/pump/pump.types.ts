import { Document } from "mongoose";

export interface Pump {
  name: string;
  active: boolean;
}

export interface PumpDocument extends Pump, Document {}
