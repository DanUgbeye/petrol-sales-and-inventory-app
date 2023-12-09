import { USER_ROLES } from "@/global-types/user.types";
import { UserDocument } from "./user.types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: [USER_ROLES.MANAGER, USER_ROLES.EMPLOYEE],
      default: USER_ROLES.EMPLOYEE,
    },
    password: {
      type: String,
      required: true,
    },
    sex: { type: String },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
