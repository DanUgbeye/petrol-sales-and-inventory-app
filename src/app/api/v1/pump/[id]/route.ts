import connectDB from "@/server/db/connect";
import { BaseException, ServerException } from "@/server/exceptions";
import PumpRepository from "@/server/modules/pump/pump.repository";
import ServerResponse from "@/server/utils/response";

type RouteParams = { id: string };

async function GetPumpById(req: Request, context: { params: RouteParams }) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const pumpRepo = new PumpRepository(conn);
    const pump = await pumpRepo.getPumpById(context.params.id);

    return ServerResponse.success("Pump retrieved Successfully", pump, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
} 

async function UpdatePump(req: Request, context: { params: RouteParams }) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    return ServerResponse.success("Pump created Successful", 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

async function RemovePump(req: Request, context: { params: RouteParams }) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    return ServerResponse.success("Pump Removed Successful", 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { GetPumpById as GET, UpdatePump as POST, RemovePump as DELETE };
