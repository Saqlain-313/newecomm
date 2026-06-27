const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["home", "office", "other"],
      default: "home",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    secondPhone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      default: "",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    addresses: [addressSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);