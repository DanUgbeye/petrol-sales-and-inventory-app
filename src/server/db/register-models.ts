import { model } from "mongoose";
import userSchema from "../modules/user/user.schema";
import saleSchema from "../modules/sale/sale.schema";
import inventorySchema from "../modules/inventory/inventory.schema";
import orderSchema from "../modules/order/order.schema";

export default function registerModels() {
  if (!global.registeredModels) {
    console.log("Registering User Model");
    model("User", userSchema);

    console.log("Registering Sale Model");
    model("Sale", saleSchema);

    console.log("Registering Inventory Model");
    model("Inventory", inventorySchema);

    console.log("Registering Order Model");
    model("Order", orderSchema);

    global.registeredModels = true;
  }
}
