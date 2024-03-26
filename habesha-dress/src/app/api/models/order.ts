import mongoose, { Schema } from "mongoose";

const clothOrder = new Schema(
  {
    orderCustomerLocation: {
      type: String,
      default: "",
    },
    orderNumber: {
      type: String,
      default: "",
    },
    orderTax: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "",
    },
    totalOrderAmount: {
      type: Number,
      default: 0,
    },
    subtotalOrderAmount: {
      type: Number,
      default: 0,
    },
    shippingAmount: {
      type: Number,
      default: 0,
    },
    dateOfOrder: {
      type: Date,
      default: "",
    },
    deliveryStatus: {
      type: String,
      default: "",
    },
    customerId: {
      type: String,
      default: "",
    },
    customerAddress: {
      type: Array,
      default: [],
    },
    customerEmail: {
      type: String,
      default: "",
    },
    customerPhone: {
      type: String,
      default: "",
    },
    customerName: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "",
    },
    orderProductsQuantity: {
      type: Number,
      default: 0,
    },
    wholeOrderObject: {
      type: Array,

      default: [],
    },
    orderedProducts: {
      type: Array,

      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ClothsOrder =
  mongoose.models.ClothsOrder || mongoose.model("ClothsOrder", clothOrder);

export default ClothsOrder;
