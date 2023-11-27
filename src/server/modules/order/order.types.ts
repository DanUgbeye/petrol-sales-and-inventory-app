import { Order } from "@/global-types/order.types";
import { Document } from "mongoose";

export interface OrderDocument extends Order, Document {}
