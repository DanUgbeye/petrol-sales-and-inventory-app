import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import OrderRepository from "@/server/modules/order/order.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = { id: string };
type RouteContext = { params: RouteParams };

/**
 * Gets the order by id
 * @route GET - ../v1/order/:id
 */
async function getOrderById(req: NextRequest, context: RouteContext) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const orderRepo = new OrderRepository(conn);
    const order = await orderRepo.getOrderById(context.params.id);

    return ServerResponse.success("Order retrieved", order, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * Delete order
 * @route DELETE - ../v1/order/:id
 */
async function deleteOrder(req: NextRequest, context: RouteContext) {
  try {
    AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const orderRepo = new OrderRepository(conn);
    const order = await orderRepo.deleteOrder(context.params.id);

    return ServerResponse.success("order deleted", 204);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getOrderById as GET, deleteOrder as DELETE };
