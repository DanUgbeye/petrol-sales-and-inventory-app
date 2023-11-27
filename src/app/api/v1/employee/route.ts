import { USER_ROLES, User } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import UserRepository from "@/server/modules/user/user.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * gets a user profile
 * @route GET - .../v1/employee/
 */
async function getAllEmployees(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();

    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const users = await userRepo.getAllEmployees();
    const filteredUsers = users.map((user) => {
      let { password, ...filteredUser } = user.toObject();
      return filteredUser;
    });

    return ServerResponse.success("Employees Retrieved", filteredUsers, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * register a new employee
 * @route GET - .../v1/employee/
 */
async function registerEmployee(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    let body = (await req.json()) as User;

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const data = await userRepo.registerEmployee(body);
    let { password, ...user } = data.toObject();

    return ServerResponse.success("Employee created", user, 201);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getAllEmployees as GET, registerEmployee as POST };
