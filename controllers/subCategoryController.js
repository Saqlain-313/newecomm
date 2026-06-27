const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const slugify = require("slugify");
const sharp = require("sharp");
const axios = require("axios");
const FormData = require("form-data");


// =========================
// IMAGE UPLOAD (IMGBB)
// =========================
const uploadToImgBB = async (buffer, originalname) => {
  const compressedBuffer = await sharp(buffer)
    .resize(600)
    .jpeg({ quality: 70 })
    .toBuffer();

  const formData = new FormData();
  formData.append("image", compressedBuffer.toString("base64"));

  const upload = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    formData,
    {
      headers: formData.getHeaders(),
      timeout: 10000,
    }
  );

  return upload.data.data.url;
};


// =========================
// CREATE SUBCATEGORY
// =========================
exports.createSubCategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    console.log(req.body)

    if (!categoryId || !name) {
      return res.status(400).json({
        success: false,
        message: "Category ID and name are required",
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const existing = await SubCategory.findOne({
      categoryId,
      name,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Subcategory already exists in this category",
      });
    }

    // ✅ Upload image if exists
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname
      );
    }

    const subCategory = await SubCategory.create({
      categoryId,
      name,
      slug: slugify(name, { lower: true, strict: true }),
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL SUBCATEGORIES
// =========================
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET BY CATEGORY
// =========================
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({ categoryId }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// UPDATE SUBCATEGORY
// =========================
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updateData = {};

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true, strict: true });
    }

    if (image) {
      updateData.image = image;
    }

    const updated = await SubCategory.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE SUBCATEGORY
// =========================
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};