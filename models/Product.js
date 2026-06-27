const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
      index: true,
    },

    image: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    heading: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    fullDescription: {
      type: String,
      default: "",
    },

    discount: {
      type: String,
      default: "",
    },

    oldPrice: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      default: "",
    },

    sizes: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    replacement: {
      type: String,
      default: "10-days return available",
    },

    delivery: {
      type: String,
      default: "Delivery within 6 days",
    },

    paymenttype: {
      type: String,
      default: "Cash on Delivery",
    },
  },
  {
    timestamps: true,
  }
);

// Fast filtering
productSchema.index({
  category: 1,
  subCategory: 1,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);