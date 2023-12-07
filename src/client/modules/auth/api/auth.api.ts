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
  NewEmployeeData,
} from "@/global-types/user.types";
import { AuthData } from "@/global-types/auth.types";

export class AuthAPIService {
  constructor(private service: ApiService) {}

  /**
   * logs in a user
   * @param role user role to login
   * @param data user data
   * @param options request options
   */
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

  /**
   * register a new employee
   * @param data new employee data
   * @param options request options
   * @returns 
   */
  async register(data: NewEmployeeData, options?: RequestOptions) {
    // console.log(this.service.axios.defaults.headers);

    try {
      const path = "/employee";

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
