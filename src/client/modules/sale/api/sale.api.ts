"use client";
import { ApiService, ApiSuccessResponse, RequestOptions } from "@/client/modules/api";
import { Sale } from "@/global-types/sale.types";

export class SaleAPIService {
  constructor(private service: ApiService) {}

  async getAllSale(options?: RequestOptions) {
    try {
      const path = "/sale";

      const res = await this.service.axios.get<ApiSuccessResponse<Sale[]>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
