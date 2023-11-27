import { Model, model } from "mongoose";
import userSchema from "../modules/user/user.schema";
import saleSchema from "../modules/sale/sale.schema";

export default function registerModels() {
  if (!global.registeredModels) {
    console.log("Registering User Model");
    model("User", userSchema);

    console.log("Registering Sale Model");
    model("Sale", saleSchema);

    global.registeredModels = true;
  }
}
