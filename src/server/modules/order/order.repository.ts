import type _mongoose from "mongoose";
import type { Model } from "mongoose";
import { OrderDocument } from "./order.types";
import {
  BadRequestException,
  NotFoundException,
  ServerException,
} from "@/server/exceptions";
import { ORDER_STATUS, Order } from "@/global-types/order.types";
import InventoryRepository from "../inventory/inventory.repository";

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
      order = await this.collection.find().sort({ createdAt: -1 });
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
   * marks an order as complete a new order
   * @param id order id
   */
  async completeOrder(id: string) {
    let order: OrderDocument | null;

    try {
      order = await this.collection.findById(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!order) {
      throw new NotFoundException("order not found");
    }

    if (order.status === ORDER_STATUS.COMPLETED) {
      throw new BadRequestException("order already completed");
    }

    order.status = ORDER_STATUS.COMPLETED;

    try {
      await order.save();
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
      order = await this.collection.findById(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    if (order.status === ORDER_STATUS.COMPLETED) {
      throw new BadRequestException("Order already completed");
    }

    try {
      await order.deleteOne();
      // order = await this.collection.findByIdAnd(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return order;
  }
}
