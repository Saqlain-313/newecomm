const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 Generate Token
const generateToken = (id) => {
    return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// 🔹 REGISTER

// 🔹 REGISTER ADMIN (POST)
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // ✅ check existing admin
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists",
            });
        }

        // ✅ hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 🔹 LOGIN (SET COOKIE)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = generateToken(admin._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        res.status(200).json({
            success: true,
            admin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// 🔹 LOGOUT
exports.logout = (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

exports.updateAddresses = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { addresses } = req.body;

    if (!Array.isArray(addresses)) {
      return res.status(400).json({
        success: false,
        message: "Addresses must be an array",
      });
    }

    // Only one default address
    const defaultAddresses = addresses.filter(
      (address) => address.isDefault === true
    );

    if (defaultAddresses.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Only one address can be default.",
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { addresses },
      { new: true, runValidators: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Addresses updated successfully.",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { addressId } = req.params;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const address = admin.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.deleteOne();

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully.",
      data: admin.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};