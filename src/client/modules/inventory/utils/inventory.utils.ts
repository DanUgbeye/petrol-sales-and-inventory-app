import {
  INVENTORY_LEVEL,
  Inventory,
  InventoryLevel,
} from "@/global-types/inventory.types";

export class InventoryUtils {
  getInventoryLevel(inventory: Inventory): InventoryLevel {
    const quantity = inventory.quantity;

    switch (true) {
      case quantity > 10_000: {
        return INVENTORY_LEVEL.OPTIMAL;
      }
      case quantity > 3_000: {
        return INVENTORY_LEVEL.OK;
      }
      default: {
        return INVENTORY_LEVEL.LOW;
      }
    }
  }
}

const inventoryUtils = new InventoryUtils();
export default inventoryUtils;
