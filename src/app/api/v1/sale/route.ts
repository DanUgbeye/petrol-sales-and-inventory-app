import { Sale } from "@/global-types/sales.types";
import { USER_ROLES } from "@/global-types/user.types";
import connectDB from "@/server/db/connect";
import { BadRequestException, ServerException } from "@/server/exceptions";
import AuthHelpers from "@/server/modules/auth/auth.helpers";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import SaleRepository from "@/server/modules/sale/sale.repository";
import ServerResponse from "@/server/utils/response";
import { NextRequest } from "next/server";

async function getAllSales(req: NextRequest) {
  try {
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

async function recordSale(req: NextRequest) {
  try {
    const authPayload = AuthHelpers.authenticateUser(req, [
      USER_ROLES.EMPLOYEE,
    ]);

    const saleData = (await req.json()) as Sale;
    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const inventoryRepo = new InventoryRepository(conn);
    const inventory = await inventoryRepo.getInventoryById(
      saleData.inventoryId
    );

    if (inventory.quantity < saleData.quantity) {
      throw new BadRequestException("inventory too low");
    }

    const saleRepo = new SaleRepository(conn);
    const sale = await saleRepo.recordSale(saleData);

    await inventoryRepo.updateInventory(saleData.inventoryId, {
      quantity: inventory.quantity - sale.quantity,
    });

    return ServerResponse.success("Sale created", sale, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getAllSales as GET, recordSale as POST };
