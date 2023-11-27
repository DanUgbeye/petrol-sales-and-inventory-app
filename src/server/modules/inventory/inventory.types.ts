import { Inventory } from "@/global-types/inventory.types";
import { Document } from "mongoose";

export interface InventoryDocument extends Inventory, Document {}
