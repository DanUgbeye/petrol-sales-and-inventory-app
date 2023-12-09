"use client";
import {
  ApiService,
  ApiSuccessResponse,
  RequestOptions,
} from "@/client/modules/api";
import { NewInventory } from "@/global-types/inventory.types";
import { Inventory } from "@/global-types/inventory.types";

export class InventoryAPIService {
  constructor(private service: ApiService) {}

  async getAllInventory(options?: RequestOptions) {
    try {
      const path = "/inventory";

      const res = await this.service.axios.get<ApiSuccessResponse<Inventory[]>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async createInventory(data: NewInventory, options?: RequestOptions) {
    try {
      const path = "/inventory";

      const res = await this.service.axios.post<ApiSuccessResponse<Inventory>>(
        path,
        data,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async deleteInventory(inventoryId: string, options?: RequestOptions) {
    try {
      const path = `/inventory/${inventoryId}`;

      const res = await this.service.axios.delete<
        ApiSuccessResponse<Inventory[]>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
