import { Sale } from "@/global-types/sale.types";
import { Document } from "mongoose";

export interface SaleDocument extends Omit<Sale, "_id">, Document {}
