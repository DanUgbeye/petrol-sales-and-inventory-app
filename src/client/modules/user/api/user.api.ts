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
  UserLoginData,
  UserRole,
} from "@/global-types/user.types";
import { AuthData } from "@/global-types/auth.types";

export class UserAPIService {
  constructor(private service: ApiService) {}

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
}
