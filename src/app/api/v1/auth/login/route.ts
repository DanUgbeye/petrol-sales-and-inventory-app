import connectDB from "@/server/db/connect";
import { BaseException, ServerException } from "@/server/exceptions";
import { USER_ROLES } from "@/server/modules/user/user.types";
import UserRepository from "@/server/modules/user/user.repository";
import ServerResponse from "@/server/utils/response";
import { TokenUtil } from "@/server/utils/token";

async function ManagerLogin(req: Request) {
  let body = (await req.json()) as {
    email: string;
    password: string;
  };

  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const data = await userRepo.login(body, USER_ROLES.MANAGER);

    const { password, ...user } = data.toObject();
    const tokenUtil = new TokenUtil();
    let auth = tokenUtil.createJwtToken({ _id: data._id, role: data.role });

    const response = { user, auth };

    return ServerResponse.success("Login Successful", response, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { ManagerLogin as POST };
