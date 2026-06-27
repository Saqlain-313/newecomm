const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

const upload = require("../middleware/upload");
const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");


// =========================
// CREATE (ADMIN ONLY + IMAGE UPLOAD)
// =========================
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createSubCategory
);


// =========================
// GET ALL (PUBLIC)
// =========================
router.get("/", getAllSubCategories);


// =========================
// GET BY CATEGORY (PUBLIC)
// =========================
router.get("/category/:categoryId", getSubCategoriesByCategory);


// =========================
// UPDATE (ADMIN ONLY + OPTIONAL IMAGE)
// =========================
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateSubCategory
);


// =========================
// DELETE (ADMIN ONLY)
// =========================
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  deleteSubCategory
);

module.exports = router;