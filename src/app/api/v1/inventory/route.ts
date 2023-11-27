import { INVENTORY_TYPE } from "@/global-types/inventory.types";
import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import {
  BadRequestException,
  BaseException,
  ServerException,
} from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * Gets the all inventory
 * @route GET - ../v1/inventory
 */
async function getAllInventory(req: NextRequest) {
  try {
    AuthHelpers.authenticateUser(req);
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.getAllInventory();

    return ServerResponse.success("inventory retrieved", inventory, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * Adds an inventory
 * @route POST - ../v1/inventory
 */
async function addInventory(req: NextRequest) {
  try {
    AuthHelpers.authenticateUser(req, [USER_ROLES.MANAGER]);

    const inventoryData = await req.json();

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const exists = await inventoryRepo
      .getInventoryByType(inventoryData.type || INVENTORY_TYPE.FUEL)
      .catch((err) => null);

    if (exists) {
      throw new BadRequestException("inventory type already exists");
    }
    const inventory = await inventoryRepo.addInventory(inventoryData);

    return ServerResponse.success("inventory retrieved", inventory, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getAllInventory as GET, addInventory as POST };
