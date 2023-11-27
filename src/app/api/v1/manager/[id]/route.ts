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
 * updates manager profile
 * @route PATCH - .../v1/manager/:id
 */
async function updateManagerProfile(req: NextRequest, context: RouteContext) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    // const data = await userRepo.(context.params.id);
    // let { password, ...user } = data.toObject();
    throw new ServerException("route not implemented");

    // return ServerResponse.success("Profile Updated", user, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { updateManagerProfile as PATCH };
