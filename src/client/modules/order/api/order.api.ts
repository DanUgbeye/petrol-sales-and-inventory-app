"use client";
import {
  ApiService,
  ApiSuccessResponse,
  RequestOptions,
} from "@/client/modules/api";
import { NewOrder, Order } from "@/global-types/order.types";

export class OrderAPIService {
  constructor(private service: ApiService) {}

  async getAllOrders(options?: RequestOptions) {
    try {
      const path = "/order";

      const res = await this.service.axios.get<ApiSuccessResponse<Order[]>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async createOrder(data: NewOrder, options?: RequestOptions) {
    try {
      const path = "/order";

      const res = await this.service.axios.post<ApiSuccessResponse<Order>>(
        path,
        data,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async completeOrderStatus(orderId: string, options?: RequestOptions) {
    try {
      const path = `/order/${orderId}/complete`;

      const res = await this.service.axios.patch<ApiSuccessResponse<Order>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async deleteOrder(orderId: string, options?: RequestOptions) {
    try {
      const path = `/order/${orderId}`;

      const res = await this.service.axios.delete<
        ApiSuccessResponse<undefined>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
