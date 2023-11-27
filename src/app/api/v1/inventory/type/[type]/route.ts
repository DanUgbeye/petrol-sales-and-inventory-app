import { InventoryType } from "@/global-types/inventory.types";
import connectDB from "@/server/db/connect";
import { ServerException } from "@/server/exceptions";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = { type: InventoryType };
type RouteContext = { params: RouteParams };

/**
 * Gets the inventory by type
 * @route GET - ../v1/inventory/type/:type
 */
async function getInventoryByType(req: NextRequest, context: RouteContext) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.getInventoryByType(
      context.params.type
    );

    return ServerResponse.success("Inventory retrieved", inventory, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getInventoryByType as GET };
