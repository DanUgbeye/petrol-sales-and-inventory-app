"use client";
import {
  ApiService,
  ApiSuccessResponse,
  RequestOptions,
} from "@/client/modules/api";
import {
  NewEmployeeData,
  USER_ROLES,
  User,
  UserRole,
} from "@/global-types/user.types";
import { AppSalesStat } from "@/global-types/sale.types";

export class UserAPIService {
  constructor(private service: ApiService) {}

  async register(data: NewEmployeeData, options?: RequestOptions) {
    try {
      const path = "/employee";

      const res = await this.service.axios.post<ApiSuccessResponse<User>>(
        path,
        data,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async getProfile(role: UserRole, options?: RequestOptions) {
    try {
      const path =
        role === USER_ROLES.EMPLOYEE ? "/employee/profile" : "/manager/profile";

      const res = await this.service.axios.get<ApiSuccessResponse<User>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async getAllEmployees(options?: RequestOptions) {
    try {
      const path = "/employee";

      const res = await this.service.axios.get<ApiSuccessResponse<User[]>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async deleteEmployee(employeeId: string, options?: RequestOptions) {
    try {
      const path = `/employee/${employeeId}`;

      const res = await this.service.axios.delete<
        ApiSuccessResponse<undefined>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async getStats(role: UserRole, options?: RequestOptions) {
    try {
      const path =
        role === USER_ROLES.EMPLOYEE ? "/employee/stats" : "/manager/stats";

      const res = await this.service.axios.get<
        ApiSuccessResponse<AppSalesStat>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
