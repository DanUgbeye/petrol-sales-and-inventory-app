import connectDB from "@/server/db/connect";
import { BaseException, ServerException } from "@/server/exceptions";
import UserRepository from "@/server/modules/user/user.repository";
import { User } from "@/server/modules/user/user.types";
import ServerResponse from "@/server/utils/response";

async function RegisterEmployee(req: Request) {
  let body = await req.json();

  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const userRepo = new UserRepository(conn);
    const data = await userRepo.registerEmployee(body as User);
    let { password, ...user } = data.toObject();

    return ServerResponse.success("Employee created", user, 200);
  } catch (err: any) {
    let error: BaseException;

    if (err instanceof BaseException) {
      error = err;
    } else {
      error = new ServerException(err.message as string);
    }

    return ServerResponse.error(error);
  }
}

export { RegisterEmployee as POST };
