import connectDB from "@/server/db/connect";
import { BaseException, ServerException } from "@/server/exceptions";
import ServerResponse from "@/server/utils/response";

async function GetStationStats(req: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    return ServerResponse.success("Manager stats retrieved", 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { GetStationStats as GET };
