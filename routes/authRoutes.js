const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated,  getProfile);
router.get("/logout", logout);

module.exports = router;