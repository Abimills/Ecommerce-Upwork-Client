import mongoose, { Schema } from "mongoose";

const clothProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: { type: String, default: "" },
    img: { type: String, required: [true, "image is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    rating: { type: Number, required: [true, "Rating is required"] },
    discount: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    whichGroupCloth: {
      type: Array,

      default: [],
    },
    likes: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    clothOccasion: {
      type: Array,
      default: [],
    },
    couples: { type: String, default: "false" },
    category: {
      type: Array,
      required: [true, "At least one category is required"],
    },
    purchasedNumber: { type: Number, default: 0 },
    availableSizes: {
      type: Array,
    },
    availableColors: {
      type: Array,
      default: [],
    },
    forWhichGender: {
      type: Array,
      default: [],
    },
    boughtWithIds: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate discounted price
clothProductSchema.pre("save", function (next) {
  this.discountedPrice = this.price - this.discount;
  next();
});

const ClothProduct =
  mongoose.models.ClothProduct ||
  mongoose.model("ClothProduct", clothProductSchema);

export default ClothProduct;
