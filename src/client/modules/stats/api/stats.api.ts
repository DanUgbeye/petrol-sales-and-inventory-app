"use client";
import {
  ApiService,
  ApiSuccessResponse,
  RequestOptions,
} from "@/client/modules/api";
import { AppSalesStat } from "@/global-types/sale.types";

export class StatsAPIService {
  constructor(private service: ApiService) {}

  async getManagerStats(options?: RequestOptions) {
    try {
      const path = "/manager/stats";

      const res = await this.service.axios.post<
        ApiSuccessResponse<AppSalesStat>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async getEmployeeStats(options?: RequestOptions) {
    try {
      const path = "/employee/stats";

      const res = await this.service.axios.post<
        ApiSuccessResponse<AppSalesStat>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
