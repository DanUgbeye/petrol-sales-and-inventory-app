import { Order } from "@/global-types/order.types";
import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import OrderRepository from "@/server/modules/order/order.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * Gets all orders
 * @route GET - ../v1/order
 */
async function getAllOrders(req: NextRequest) {
  try {
    AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const orderRepo = new OrderRepository(conn);
    const orders = await orderRepo.getAllOrders();

    return ServerResponse.success("orders retrieved", orders, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}
/**
 * creates a new order
 * @route POST - ../v1/order
 */
async function createOrder(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const orderData = (await req.json()) as Order;

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const orderRepo = new OrderRepository(conn);
    const orders = await orderRepo.createOrder({
      ...orderData,
      managerId: userAuth._id,
    });

    return ServerResponse.success("orders retrieved", orders, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getAllOrders as GET, createOrder as POST };
