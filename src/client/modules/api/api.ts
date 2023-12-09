import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiErrorResponse } from "./api.types";
import APP_CONFIG from "@/client/config/app-config";

export class ApiService {
  private static instance: ApiService | null;
  public axios: AxiosInstance;
  private token: string;
  private baseUrl: string;

  constructor() {
    if (ApiService.instance) {
      throw new Error("Instance already exists");
    }

    const { API_BASE_URL } = APP_CONFIG;
    this.baseUrl = `/api//v1`;

    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });
    this.token = "";
    this.axios.defaults.headers.common["authorization"] = "";
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  setToken(token: string) {
    this.token = token;
    this.axios.defaults.headers.common["authorization"] = "Bearer " + token;
  }

  getToken() {
    return this.token;
  }

  handleError(err: AxiosError<ApiErrorResponse>): Error {
    let errMessage: string = "";
    if (!err.response || !err.response.data) {
      errMessage = err.message;
    } else {
      errMessage = err.response.data.message;
    }

    if (!errMessage || typeof errMessage !== "string") {
      errMessage = "SOMETHING WENT WRONG";
    }

    if (errMessage.includes("timeout")) {
      errMessage = "REQUEST TIMED OUT";
    } else if (errMessage.toLocaleLowerCase() === "access denied") {
      errMessage = "UNAUTHORIZED ACTION";
    } else if (
      typeof errMessage === "string" &&
      errMessage.toLowerCase() === "internal server error"
    ) {
      errMessage = "SOMETHING WENT WRONG ON THE SERVER";
    }

    // console.log(errMessage);
    return new Error(errMessage as string);
  }

  static getInstance() {
    if (!ApiService.instance) {
      const newInstance = new ApiService();
      ApiService.instance = newInstance;
      return newInstance;
    }

    return ApiService.instance;
  }
}

const apiService = ApiService.getInstance();
export default apiService;
