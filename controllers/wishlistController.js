const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user.id;
    console.log("USER:", req.user);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingWishlist = await Wishlist.findOne({
      userId: userId,
  productId: productId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
       userId: userId,
  productId: productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      userId: req.user.id,
    })
      .populate("productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeWishlistByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log("PARAM PRODUCT ID:", productId);
    console.log("USER:", req.user);

    const found = await Wishlist.findOne({
      userId: req.user.id,
      productId: productId,
    });

    console.log("FOUND:", found);

    const wishlist = await Wishlist.findOneAndDelete({
      userId: req.user.id,
      productId: productId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const exists = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    res.status(200).json({
      success: true,
      inWishlist: !!exists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};