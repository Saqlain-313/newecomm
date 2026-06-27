const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getProductsByCategory,
  getProductsBySubCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/*
|--------------------------------------------------------------------------
| Product Routes
|--------------------------------------------------------------------------
*/

// Create Product
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 }, 
    { name: "images", maxCount: 10 }, 
  ]),
  createProduct
);

// Get All Products
router.get("/", getAllProducts);

// Get Single Product
router.get("/:id", getSingleProduct);

// Get Products By Category
router.get("/category/:categoryId", getProductsByCategory);
router.get("/subcategory/:subCategoryId", getProductsBySubCategory);
  
// Update Product
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProduct
);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;