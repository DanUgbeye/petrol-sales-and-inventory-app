import { Model, model } from "mongoose";
import userSchema from "./setup/schemas/user.schema";
import pumpSchema from "./setup/schemas/pump.schema";

export default function registerModels() {
  if (!global.registeredModels) {
    console.log("Registering User Model");
    model("User", userSchema);

    console.log("Registering Pump Model");
    model("Pump", pumpSchema);

    global.registeredModels = true;
  }
}
