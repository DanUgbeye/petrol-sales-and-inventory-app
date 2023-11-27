import { AppSalesStat } from "@/global-types/sale.types";
import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import SaleRepository from "@/server/modules/sale/sale.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * gets petrol station sales stats for employee
 * @route GET - .../v1/employee/stats
 */
async function getEmployeeStats(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.EMPLOYEE]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const salesRepo = new SaleRepository(conn);
    const totalStats = await salesRepo.getTotalSalesStats(userAuth._id);
    const currentMonthStats = await salesRepo.getTotalSalesStats(
      userAuth._id,
      true
    );

    const stats: AppSalesStat = {
      total: totalStats,
      month: currentMonthStats,
    };

    return ServerResponse.success("Employee stats retrieved", stats, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getEmployeeStats as GET };
