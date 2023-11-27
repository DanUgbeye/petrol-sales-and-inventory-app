import type _mongoose from "mongoose";
import type { Model } from "mongoose";
import { SaleDocument } from "./sale.types";
import {
  BadRequestException,
  NotFoundException,
  ServerException,
} from "@/server/exceptions";
import { Sale } from "@/global-types/sales.types";

export default class SaleRepository {
  public collection: Model<SaleDocument>;

  constructor(conn: typeof _mongoose) {
    this.collection = conn.models.Sale as Model<SaleDocument>;
  }

  /**
   * gets a sale using id
   * @param id sale id to fetch
   */
  async getSaleById(id: string) {
    let sale: SaleDocument | null = null;

    try {
      sale = await this.collection.findById(id);
    } catch (err: any) {
      throw new ServerException(err.message);
    }

    if (!sale) {
      throw new NotFoundException("sale not found");
    }

    return sale;
  }

  /**
   * gets all sales
   * @param credentials sale credentials
   * @param role the sale role to login
   */
  async getAllSales() {
    let sale: SaleDocument[];

    try {
      sale = await this.collection.find();
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return sale;
  }

  /**
   * adds a new sale
   * @param newSale sale data
   */
  async recordSale(newSale: Partial<Sale>) {
    let sale: SaleDocument;

    try {
      sale = await this.collection.create(newSale);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return sale;
  }

  /**
   * updates a sale
   * @param id sale id
   * @param newSale sale data
   */
  async updateSale(id: string, newSale: Partial<Sale>) {
    let sale: SaleDocument | null;

    try {
      sale = await this.collection.findByIdAndUpdate(id, newSale, {
        new: true,
      });
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!sale) {
      throw new NotFoundException("sale not found");
    }

    return sale;
  }

  /**
   * deletes a sale
   * @param id the sale to delete
   */
  async deleteSale(id: string) {
    let sale: SaleDocument | null;

    try {
      sale = await this.collection.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!sale) {
      throw new NotFoundException("Sale not found");
    }

    return sale;
  }
}
