import type _mongoose from "mongoose";
import userSchema from "./schemas/user.schema";
import connectDB from "../connect";

async function setupDatabase() {
  let conn: typeof _mongoose | null;
  // connect db
  try {
    console.log("⚡ Connecting to DB ⚡");
    conn = await connectDB();

    if (!conn) {
      throw new Error("DB connection failed");
    }

    console.log("⚡ Connection Successful ⚡");
  } catch (error: any | Error) {
    throw error;
  }

  // model user
  console.log("⚡ Syncing User Schema ⚡");
  conn.model("User", userSchema);
}

setupDatabase()
  .then(() => {
    console.log("⚡ DB setup complete ⚡");
  })
  .catch((err) => {
    console.log("❌ An Error Occurred ❌");
    console.error(err);
  })
  .finally(() => {
    console.log("⚡ Clearing files ⚡");
    process.exit(0);
  });
