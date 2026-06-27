const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  updateAddresses,
  deleteAddress,
} = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated,  getProfile);
router.put("/addresses", isAuthenticated, updateAddresses);
router.delete("/addresses/:addressId", isAuthenticated, deleteAddress);
router.get("/logout", logout);

module.exports = router;