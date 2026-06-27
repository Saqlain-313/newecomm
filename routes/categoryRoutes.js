const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categoryController");

const upload = require("../middleware/upload");
const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create Category
router.post(
  "/create",
  upload.single("image"),
  createCategory
);

// Get All Categories
router.get("/all", getAllCategories);

// Get Category By Slug
router.get(
  "/slug/:slug",
  isAuthenticated,
  isAdmin,
  getCategoryBySlug
);

// Get Category By ID
router.get(
  "/:id",
  isAuthenticated,
  isAdmin,
  getCategoryById
);

// Update Category
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateCategory
);

// Delete Category
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;