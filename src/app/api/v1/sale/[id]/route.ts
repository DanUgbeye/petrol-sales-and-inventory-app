import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { BadRequestException, ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import SaleRepository from "@/server/modules/sale/sale.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

type RouteParams = { id: string };
type RouteContext = { params: RouteParams };

/**
 * gets a sale using id
 * @route GET - ../v1/sale/:id
 */
async function getSaleById(req: NextRequest, context: RouteContext) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const saleRepo = new SaleRepository(conn);
    const sale = await saleRepo.getSaleById(context.params.id);

    return ServerResponse.success("Sale retrieved", sale, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * updates a sale
 * @route PATCH - ../v1/sale/:id
 */
async function updateSale(req: NextRequest, context: RouteContext) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.EMPLOYEE]);

    const saleId = context.params.id;
    const saleData = await req.json();
    // validations
    if (saleData.quantity && saleData.quantity < 0) {
      throw new BadRequestException("quantity can only be a positive number");
    }

    if (saleData.type) {
      delete saleData.type;
    }

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const saleRepo = new SaleRepository(conn);
    const inventoryRepo = new InventoryRepository(conn);

    const previousSale = await saleRepo.getSaleById(saleId);

    // update inventory if quantity is included in update
    if (saleData.quantity) {
      // quantity of product to add back to inventory
      const quantityDifference = previousSale.quantity - saleData.quantity;
      const inventory = await inventoryRepo.getInventoryById(
        previousSale.inventoryId
      );

      if (inventory.quantity + quantityDifference < 0) {
        throw new BadRequestException("inventory too low");
      }

      await inventoryRepo.updateInventory(previousSale.inventoryId, {
        quantity: inventory.quantity + quantityDifference,
      });

      // saleData.quantity = quantityDifference;
    }

    const update = await saleRepo.updateSale(saleId, saleData);

    return ServerResponse.success("Sale updated", update, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * deletes a sale
 * @route DELETE - ../v1/sale/:id
 */
async function deleteSale(req: NextRequest, context: RouteContext) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.EMPLOYEE]);

    const saleId = context.params.id;

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const saleRepo = new SaleRepository(conn);
    const inventoryRepo = new InventoryRepository(conn);

    const sale = await saleRepo.getSaleById(saleId);
    const quantityToRedeem = sale.quantity;

    const inventory = await inventoryRepo.getInventoryById(sale.inventoryId);

    await inventoryRepo.updateInventory(sale.inventoryId, {
      quantity: inventory.quantity + quantityToRedeem,
    });

    await saleRepo.deleteSale(saleId);

    return ServerResponse.success("Sale deleted", 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getSaleById as GET, updateSale as PATCH, deleteSale as DELETE };
