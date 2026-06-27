const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Same category me duplicate subcategory name na aaye
subCategorySchema.index(
  { categoryId: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "SubCategory",
  subCategorySchema
);