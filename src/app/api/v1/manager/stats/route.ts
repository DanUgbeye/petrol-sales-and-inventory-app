import { AppSalesStat } from "@/global-types/sale.types";
import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import SaleRepository from "@/server/modules/sale/sale.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * gets petrol station sales stats
 * @route GET - .../v1/manager/stats
 */
async function getManagerStats(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const salesRepo = new SaleRepository(conn);
    const totalStats = await salesRepo.getTotalSalesStats();
    const currentMonthStats = await salesRepo.getTotalSalesStats(null, true);

    const stats: AppSalesStat = {
      total: totalStats,
      month: currentMonthStats,
    };

    return ServerResponse.success("Sales stats retrieved", stats, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getManagerStats as GET };
