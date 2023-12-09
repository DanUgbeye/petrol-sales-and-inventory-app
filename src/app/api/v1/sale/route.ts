import { NewSale } from "@/global-types/sale.types";
import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { BadRequestException, ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import SaleRepository from "@/server/modules/sale/sale.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

/**
 * gets all sales
 * @route GET - ../v1/sale
 */
async function getAllSales(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req);

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const saleRepo = new SaleRepository(conn);
    const sales = await saleRepo.getAllSales();

    return ServerResponse.success("Sales retrieved", sales, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

/**
 * records a new a sale
 * @route POST - ../v1/sale
 */
async function recordSale(req: NextRequest) {
  try {
    const userAuth = AuthHelpers.authenticateUser(req, [USER_ROLES.EMPLOYEE]);

    const saleData = (await req.json()) as NewSale;

    if (saleData.quantity <= 0) {
      throw new BadRequestException("quantity must be greater than 0");
    }

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.getInventoryByType(saleData.type);

    if (inventory.quantity < saleData.quantity) {
      throw new BadRequestException("inventory too low");
    }

    const saleRepo = new SaleRepository(conn);
    const sale = await saleRepo.recordSale({
      ...saleData,
      inventoryId: inventory._id,
      inventoryType: inventory.type,
      employeeId: userAuth._id,
      pricePerLitre: inventory.pricePerLitre,
    });

    await inventoryRepo.updateInventory(inventory._id, {
      quantity: inventory.quantity - sale.quantity,
    });

    return ServerResponse.success("Sale created", sale, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getAllSales as GET, recordSale as POST };
