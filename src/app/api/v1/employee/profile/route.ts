import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import UserRepository from "@/server/modules/user/user.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = {
  id: string;
};

/**
 * gets logged in employee profile
 * @route GET - .../v1/employee/profile
 */
async function getProfile(req: NextRequest, context: { params: RouteParams }) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.EMPLOYEE]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const data = await userRepo.getProfile(userAuth._id);
    let { password, ...user } = data.toObject();

    return ServerResponse.success("Profile Retrieved", user, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getProfile as GET };
