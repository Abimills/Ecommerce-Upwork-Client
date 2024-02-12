import mongoose, { Schema } from "mongoose";

const clothProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: String,
    img: { type: String, required: [true, "image is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    rating: { type: Number, required: [true, "Rating is required"] },
    category: {
      type: Array,
      required: [true, "At least one category is required"],
    },
    purchasedNumber: { type: Number },
    availableSizes: {
      type: Array,
      required: [true, "At lease one size is required"],
    },
    availableColors: {
      type: Array,
      required: [true, "At lease one color is required"],
    },
    forWhichGender: {
      type: Array,
    },
    boughtWithIds: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ClothProduct =
  mongoose.models.ClothProduct ||
  mongoose.model("ClothProduct", clothProductSchema);

export default ClothProduct;
