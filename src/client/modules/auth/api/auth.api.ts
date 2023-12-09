"use client";
import {
  ApiService,
  ApiSuccessResponse,
  RequestOptions,
} from "@/client/modules/api";
import {
  USER_ROLES,
  User,
  UserLoginData,
  UserRole,
} from "@/global-types/user.types";
import { AuthData } from "@/global-types/auth.types";

export class AuthAPIService {
  constructor(private service: ApiService) {}

  async login(role: UserRole, data: UserLoginData, options?: RequestOptions) {
    try {
      const path =
        role === USER_ROLES.EMPLOYEE
          ? "/auth/employee-login"
          : "/auth/manager-login";

      const res = await this.service.axios.post<
        ApiSuccessResponse<{
          user: User;
          auth: AuthData;
        }>
      >(path, data, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
