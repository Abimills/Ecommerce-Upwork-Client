import mongoose from "mongoose";
import validateAllowedFields from "../../util/validateAllowedFields";
import validationEmail from "../../util/ValidateEmail";
import bcrypt from "bcrypt";
import encryptPassword from "../../util/encryptPassword";
import { timeStamp } from "console";

const { SchemaTypes } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      max: 255,
      unique: true,
      validate: [validationEmail, "Please enter a valid email"],
    },

    gender: {
      type: String,
      required: [true, "Please enter a gender"],
    },
    phone: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    photoUser: {
      type: String,
      default: "",
    },
    orders: {
      type: Array,
      default: [],
    },
    itemsBought: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    favReviews: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const newPassword = await encryptPassword(this.password);
  this.password = newPassword;
  next();
});

// static method to login user

const ClothUser =
  mongoose.models.ClothUser || mongoose.model("ClothUser", userSchema);

export default ClothUser;
