import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import UserRepository from "@/server/modules/user/user.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = { id: string };
type RouteContext = { params: RouteParams };

/**
 * gets an employee profile
 * @route GET - .../v1/employee/:id
 */
async function getEmployeeProfile(req: NextRequest, context: RouteContext) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();

    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const data = await userRepo.getProfile(context.params.id);
    let { password, ...user } = data.toObject();

    return ServerResponse.success("Profile Retrieved", user, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * remove an employee
 * @route DELETE - .../v1/employee/:id
 */
async function removeEmployee(req: NextRequest, context: RouteContext) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();

    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const data = await userRepo.deleteUser(context.params.id);
    let { password, ...user } = data.toObject();

    return ServerResponse.success("Profile Retrieved", 204);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getEmployeeProfile as GET, removeEmployee as DELETE };
