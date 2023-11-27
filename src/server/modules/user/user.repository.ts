import type _mongoose from "mongoose";
import type { Model } from "mongoose";
import { User, UserDocument, UserRole } from "./user.types";
import { USER_ROLES } from "./user.types";
import {
  BadRequestException,
  NotFoundException,
  ServerException,
} from "@/server/exceptions";
import { PasswordUtil } from "@/server/utils/password";

export default class UserRepository {
  public repo: Model<UserDocument>;

  constructor(conn: typeof _mongoose) {
    this.repo = conn.models.User as Model<UserDocument>;
  }

  /**
   * logs in a user
   * @param credentials user credentials
   * @param role the user role to login
   */
  async login(
    credentials: { email: string; password: string },
    role: UserRole = USER_ROLES.EMPLOYEE
  ) {
    const { email, password } = credentials;

    let user: UserDocument | null;
    try {
      user = await this.repo.findOne({ email, role });
    } catch (error) {
      throw new ServerException();
    }

    if (
      !user ||
      !(await PasswordUtil.comparePassword(password, user.password))
    ) {
      throw new BadRequestException("incorrect credentials");
    }

    return user;
  }

  /**
   * registers a new employee
   * @param credentials user credentials
   * @param role the user role to login
   */
  async registerEmployee(credentials: User) {
    let user: UserDocument | null;

    credentials.password = await PasswordUtil.hashPassword(
      credentials.password
    );

    try {
      user = await this.repo.create(credentials);
    } catch (error) {
      throw new ServerException();
    }

    return user;
  }

  /** gets all employees */
  async findAllEmployees() {
    let users: UserDocument[];

    try {
      users = await this.repo.find({ role: USER_ROLES.EMPLOYEE });
    } catch (error) {
      throw new ServerException();
    }

    return users;
  }

  /**
   * gets a user profile
   * @param id user id to fetch
   */
  async getProfile(id: string) {
    let user: UserDocument | null = null;

    try {
      user = await this.repo.findById(id);
    } catch (err: any) {
      throw new ServerException(err.message);
    }

    if (!user) {
      throw new NotFoundException("user profile not found");
    }

    return user;
  }
}
