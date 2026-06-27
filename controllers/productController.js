const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const sharp = require("sharp");
const axios = require("axios");
const FormData = require("form-data");

/**
 * Upload Image To ImgBB
 */
const uploadToImgBB = async (buffer, originalname) => {
  const compressedBuffer = await sharp(buffer)
    .resize(600)
    .jpeg({ quality: 70 })
    .toBuffer();

  const formData = new FormData();

  formData.append("image", compressedBuffer, {
    filename: originalname,
    contentType: "image/jpeg",
  });

  const upload = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    formData,
    {
      headers: formData.getHeaders(),
      timeout: 10000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }
  );

  return upload.data.data.url;
};

/**
 * CREATE PRODUCT
 */
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      heading,
      description,
      fullDescription,
      discount,
      oldPrice,
      price,
      comment,
      rating,
      replacement,
      delivery,
      paymenttype,
    } = req.body;

    if (
      !name ||
      !category ||
      !subCategory ||
      !heading ||
      !oldPrice ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const categoryExists =
      await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subCategoryExists =
      await SubCategory.findOne({
        _id: subCategory,
        categoryId: category,
      });

    if (!subCategoryExists) {
      return res.status(404).json({
        success: false,
        message:
          "SubCategory does not belong to selected category",
      });
    }

    // Main Image
    let image = "";

    if (req.files?.image?.[0]) {
      image = await uploadToImgBB(
        req.files.image[0].buffer,
        req.files.image[0].originalname
      );
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Main image is required",
      });
    }

    // Gallery Images
    const images = [];

    if (req.files?.images?.length) {
      for (const file of req.files.images) {
        const imageUrl = await uploadToImgBB(
          file.buffer,
          file.originalname
        );

        images.push(imageUrl);
      }
    }

    const product = await Product.create({
      name,
      category,
      subCategory,
      image,
      images,
      heading,
      description,
      fullDescription,
      discount,
      oldPrice,
      price,
      comment,
      sizes: req.body.sizes
        ? JSON.parse(req.body.sizes)
        : [],
      rating,
      replacement,
      delivery,
      paymenttype,
    });

    const populatedProduct =
      await Product.findById(product._id)
        .populate("category")
        .populate("subCategory");

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL PRODUCTS
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SINGLE PRODUCT
 */
exports.getSingleProduct = async (
  req,
  res
) => {
  try {
    const product = await Product.findById(
      req.params.id
    )
      .populate("category")
      .populate("subCategory");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET PRODUCTS BY CATEGORY
 */
exports.getProductsByCategory =
  async (req, res) => {
    try {
      const products =
        await Product.find({
          category: req.params.categoryId,
        })
          .populate("category")
          .populate("subCategory")
          .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/**
 * GET PRODUCTS BY SUBCATEGORY
 */
exports.getProductsBySubCategory =
  async (req, res) => {
    try {
      const products =
        await Product.find({
          subCategory:
            req.params.subCategoryId,
        })
          .populate("category")
          .populate("subCategory")
          .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/**
 * UPDATE PRODUCT
 */
exports.updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Validate Category + SubCategory
    if (
      updateData.category &&
      updateData.subCategory
    ) {
      const subCategoryExists =
        await SubCategory.findOne({
          _id: updateData.subCategory,
          categoryId:
            updateData.category,
        });

      if (!subCategoryExists) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid category/subCategory combination",
        });
      }
    }

    // Parse Sizes
    if (req.body.sizes) {
      updateData.sizes = JSON.parse(
        req.body.sizes
      );
    }

    // Update Main Image
    if (req.files?.image?.[0]) {
      updateData.image =
        await uploadToImgBB(
          req.files.image[0].buffer,
          req.files.image[0]
            .originalname
        );
    }

    // Update Gallery Images
    if (req.files?.images?.length) {
      const galleryImages = [];

      for (const file of req.files.images) {
        const imageUrl =
          await uploadToImgBB(
            file.buffer,
            file.originalname
          );

        galleryImages.push(imageUrl);
      }

      updateData.images =
        galleryImages;
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("category")
        .populate("subCategory");

    return res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "Update Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE PRODUCT
 */
exports.deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};