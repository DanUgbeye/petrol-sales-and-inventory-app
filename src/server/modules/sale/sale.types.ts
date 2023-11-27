import { Sale } from "@/global-types/sales.types";
import { Document } from "mongoose";

export interface SaleDocument extends Sale, Document {}
