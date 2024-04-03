import mongoose from "mongoose";
import validateAllowedFields from "../../util/validateAllowedFields";
import validationEmail from "../../util/ValidateEmail";
import bcrypt from "bcrypt";
import encryptPassword from "../../util/encryptPassword";
import { timeStamp } from "console";

const { SchemaTypes } = mongoose;

const userInfoSchema = new mongoose.Schema(
  {
    userInfo: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// static method to login user

const ClothUserInfo =
  mongoose.models.ClothUserInfo ||
  mongoose.model("ClothUserInfo", userInfoSchema);

export default ClothUserInfo;
