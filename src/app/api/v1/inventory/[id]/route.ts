import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = { id: string };
type RouteContext = { params: RouteParams };

/**
 * Gets the inventory by id
 * @route GET - ../v1/inventory/:id
 */
async function getInventoryById(req: NextRequest, context: RouteContext) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.getInventoryById(context.params.id);

    return ServerResponse.success("Inventory retrieved", inventory, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * Delete inventory
 * @route DELETE - ../v1/inventory/:id
 */
async function deleteInventory(req: NextRequest, context: RouteContext) {
  try {
    AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.deleteInventory(context.params.id);

    return ServerResponse.success("inventory deleted", 204);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getInventoryById as GET, deleteInventory as DELETE };
