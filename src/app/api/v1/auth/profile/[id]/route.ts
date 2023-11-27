import connectDB from "@/server/db/connect";
import {
  AuthenticationException,
  BaseException,
  ServerException,
} from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import UserRepository from "@/server/modules/user/user.repository";
import ServerResponse from "@/server/utils/response";
import { TokenUtil } from "@/server/utils/token";
import { NextRequest } from "next/server";

type RouteParams = {
  id: string;
};

/**
 * gets a user profile
 * @route GET - .../v1/auth/profile/:id
 */
async function GetProfile(req: NextRequest, context: { params: RouteParams }) {
  try {
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

export { GetProfile as GET };
