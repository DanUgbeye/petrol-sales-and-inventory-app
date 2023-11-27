import connectDB from "@/server/db/connect";
import { BadRequestException, ServerException } from "@/server/exceptions";
import InventoryRepository from "@/server/modules/inventory/inventory.repository";
import SaleRepository from "@/server/modules/sale/sale.repository";
import ServerResponse from "@/server/utils/response";

type RouteParams = { id: string };
type RouteContext = { params: RouteParams };

async function getSaleById(req: Request, context: RouteContext) {
  try {
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

async function updateSale(req: Request, context: RouteContext) {
  try {
    const saleId = context.params.id;
    const saleData = await req.json();

    const conn = await connectDB();
    if (!conn) {
      return ServerResponse.error(new ServerException());
    }

    const saleRepo = new SaleRepository(conn);
    const inventoryRepo = new InventoryRepository(conn);

    const previousSale = await saleRepo.getSaleById(saleId);
    // quantity of product to add back to inventory
    const quantityDifference = previousSale.quantity - saleData.quantity;

    // update inventory if quantity is included in update
    if (saleData.quantity) {
      const inventory = await inventoryRepo.getInventoryById(
        saleData.inventoryId
      );

      if (inventory.quantity + quantityDifference < 0) {
        throw new BadRequestException("inventory too low");
      }

      await inventoryRepo.updateInventory(saleData.inventoryId, {
        quantity: inventory.quantity - quantityDifference,
      });

      saleData.quantity = quantityDifference;
    }

    const update = await saleRepo.updateSale(saleId, saleData);

    return ServerResponse.success("Sale updated", update, 200);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

async function deleteSale(req: Request, context: RouteContext) {
  try {
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

    return ServerResponse.success("Sale deleted", 204);
  } catch (err: any) {
    return ServerResponse.error(err);
  }
}

export { getSaleById as GET, updateSale as PATCH, deleteSale as DELETE };
