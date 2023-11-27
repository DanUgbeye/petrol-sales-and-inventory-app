import type _mongoose from "mongoose";
import type { Model } from "mongoose";
import { InventoryDocument } from "./inventory.types";
import { NotFoundException, ServerException } from "@/server/exceptions";
import { Inventory, InventoryType } from "@/global-types/inventory.types";

export default class InventoryRepository {
  public collection: Model<InventoryDocument>;

  constructor(conn: typeof _mongoose) {
    this.collection = conn.models.Inventory as Model<InventoryDocument>;
  }

  /**
   * gets a inventory by id
   * @param id inventory id to find
   */
  async getInventoryById(id: string) {
    let inventory: InventoryDocument | null = null;

    try {
      inventory = await this.collection.findById(id);
    } catch (err: any) {
      throw new ServerException(err.message);
    }

    if (!inventory) {
      throw new NotFoundException("inventory not found");
    }

    return inventory;
  }

  /**
   * gets a inventory by type
   * @param id inventory type to find
   */
  async getInventoryByType(type: InventoryType) {
    let inventory: InventoryDocument | null = null;

    try {
      inventory = await this.collection.findOne({ type });
    } catch (err: any) {
      throw new ServerException(err.message);
    }

    if (!inventory) {
      throw new NotFoundException("inventory not found");
    }

    return inventory;
  }

  /**
   * gets all inventory
   */
  async getAllInventory() {
    let inventory: InventoryDocument[];

    try {
      inventory = await this.collection.find();
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return inventory;
  }

  /**
   * adds a new inventory
   * @param newInventory inventory data
   */
  async addInventory(newInventory: Partial<Inventory>) {
    let inventory: InventoryDocument;

    try {
      inventory = await this.collection.create(newInventory);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return inventory;
  }

  /**
   * updates an inventory
   * @param id inventory id to update
   * @param inventoryData inventory data
   */
  async updateInventory(id: string, inventoryData: Partial<Inventory>) {
    let inventory: InventoryDocument | null;

    try {
      inventory = await this.collection.findByIdAndUpdate(id, inventoryData);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!inventory) {
      throw new NotFoundException("Inventory not found");
    }

    return inventory;
  }

  /**
   * deletes a inventory
   * @param id the inventory to delete
   */
  async deleteInventory(id: string) {
    let inventory: InventoryDocument | null;

    try {
      inventory = await this.collection.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!inventory) {
      throw new NotFoundException("Inventory not found");
    }

    return inventory;
  }
}
