import connectDB from "@/server/db/connect";
import { BaseException, ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import PumpRepository from "@/server/modules/pump/pump.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

async function getAllPumps(req: NextRequest) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const pumpRepo = new PumpRepository(conn);
    const pumps = await pumpRepo.getAllPumps();

    return ServerResponse.success("Pumps retrieved Successfully", pumps, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

async function addPump(req: NextRequest) {
  try {
    const authPayload = AuthHelpers.authenticateUser(req);
    // Require role manager

    const body = await req.json();
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const pumpRepo = new PumpRepository(conn);
    const pump = await pumpRepo.addPump(body);

    return ServerResponse.success("Pump created Successful", pump, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getAllPumps as GET, addPump as POST };
