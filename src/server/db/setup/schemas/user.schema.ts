import { USER_ROLES } from "./../../../modules/user/user.types";
import { UserDocument } from "./../../../modules/user/user.types";
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
