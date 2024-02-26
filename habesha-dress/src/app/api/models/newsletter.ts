import validationEmail from "@/app/util/ValidateEmail";
import mongoose, { Schema } from "mongoose";

const clothNewsletterSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const ClothNewsletter =
  mongoose.models.ClothNewsletter ||
  mongoose.model("ClothNewsletter", clothNewsletterSchema);

export default ClothNewsletter;
