const axios = require("axios");
const FormData = require("form-data");
const sharp = require("sharp");
const slugify = require("slugify");

const Category = require("../models/Category");

/* =====================================================
   🔹 HELPER: FAST IMAGE UPLOAD (IMGBB)
===================================================== */
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

/* =====================================================
   ✅ CREATE CATEGORY
===================================================== */
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    let imageUrl;

    try {
      imageUrl = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname
      );
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const category = await Category.create({
      name,
      slug,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    return res.status(500).json({
      success: false,
      message: "Category creation failed",
    });
  }
};

/* =====================================================
   ✅ GET ALL CATEGORIES
===================================================== */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   ✅ GET CATEGORY BY SLUG
===================================================== */
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category by slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   ✅ GET CATEGORY BY ID
===================================================== */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category by id error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   ✅ UPDATE CATEGORY
===================================================== */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (name) {
      const slug = slugify(name, {
        lower: true,
        strict: true,
      });

      const existingCategory = await Category.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category already exists",
        });
      }

      category.name = name;
      category.slug = slug;
    }

    if (req.file) {
      try {
        category.image = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname
        );
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   ✅ DELETE CATEGORY
===================================================== */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};