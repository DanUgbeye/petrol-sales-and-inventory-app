import type _mongoose from "mongoose";
import type { Model } from "mongoose";
import { OrderDocument } from "./order.types";
import {
  BadRequestException,
  NotFoundException,
  ServerException,
} from "@/server/exceptions";
import { Order } from "@/global-types/order.types";

export default class OrderRepository {
  public collection: Model<OrderDocument>;

  constructor(conn: typeof _mongoose) {
    this.collection = conn.models.Order as Model<OrderDocument>;
  }

  /**
   * gets a order using id
   * @param id order id to fetch
   */
  async getOrderById(id: string) {
    let order: OrderDocument | null = null;

    try {
      order = await this.collection.findById(id);
    } catch (err: any) {
      throw new ServerException(err.message);
    }

    if (!order) {
      throw new NotFoundException("order not found");
    }

    return order;
  }

  /**
   * gets all orders
   * @param credentials order credentials
   * @param role the order role to login
   */
  async getAllOrders() {
    let order: OrderDocument[];

    try {
      order = await this.collection.find();
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return order;
  }

  /**
   * creates a new order
   * @param newOrder order data
   */
  async createOrder(newOrder: Partial<Order>) {
    let order: OrderDocument;

    try {
      order = await this.collection.create(newOrder);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return order;
  }

  /**
   * creates a new order
   * @param newOrder order data
   */
  async completeOrder(newOrder: Partial<Order>) {
    let order: OrderDocument;

    try {
      order = await this.collection.create(newOrder);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return order;
  }

  /**
   * deletes a order
   * @param id the order to delete
   */
  async deleteOrder(id: string) {
    let order: OrderDocument | null;

    try {
      order = await this.collection.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }
}
