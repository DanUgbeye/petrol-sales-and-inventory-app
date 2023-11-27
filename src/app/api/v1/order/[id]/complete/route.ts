import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import OrderRepository from "@/server/modules/order/order.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = { id: string };
type RouteContext = { params: RouteParams };
/**
 * mark an order as complete
 * @route PATCH - ../v1/order/:id/complete
 */
async function markOrderAsComplete(req: NextRequest, context: RouteContext) {
  try {
    const orderId = context.params.id;
    const user = AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const orderRepo = new OrderRepository(conn);
    const order = await orderRepo.completeOrder(orderId);

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.getInventoryByType(order.type);
    await inventoryRepo.updateInventory(inventory._id, {
      quantity: inventory.quantity + order.quantity,
      pricePerLitre: order.pricePerLitre,
    });

    return ServerResponse.success("success", order, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { markOrderAsComplete as PATCH };
