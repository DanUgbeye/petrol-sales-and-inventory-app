import { User } from "@/global-types/user.types";
import { Document } from "mongoose";

export interface UserDocument extends User, Document {}
