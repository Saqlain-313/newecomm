const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController.js");

const { isAuthenticated } = require("../middleware/authMiddleware.js");

router.post("/add", isAuthenticated, addToCart);

router.get("/", isAuthenticated, getCart);

router.put("/update/:id", isAuthenticated, updateCartQuantity);

router.delete("/remove/:id", isAuthenticated, removeFromCart);

router.delete("/clear", isAuthenticated, clearCart);

module.exports = router;