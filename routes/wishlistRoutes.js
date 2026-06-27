const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  removeWishlistByProduct,
  checkWishlist,
} = require("../controllers/wishlistController");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/add", isAuthenticated, addToWishlist);

router.get("/", isAuthenticated, getWishlist);

router.get("/check/:productId", isAuthenticated, checkWishlist);

router.delete("/remove/:id", isAuthenticated, removeFromWishlist);

router.delete(
  "/remove-product/:productId",
  isAuthenticated,
  removeWishlistByProduct
);

module.exports = router;