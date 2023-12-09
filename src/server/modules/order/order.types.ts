import { Order } from "@/global-types/order.types";
import { Document } from "mongoose";

export interface OrderDocument extends Omit<Order, "_id">, Document {}
