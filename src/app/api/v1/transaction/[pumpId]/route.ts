import connectDB from "@/server/db/connect";
import { BaseException, ServerException } from "@/server/exceptions";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * Gets the transaction stats
 * @route GET - ../v1/transaction/:pumpId
 */
async function GetTransactionsForPump(
  req: NextRequest,
  { params }: { params: { pumpId: string } }
) {
  const searchParams = req.nextUrl.searchParams;

  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    return ServerResponse.success("Transaction Stats", 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { GetTransactionsForPump as GET };
