require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path"); 
const connectdb = require("./config/connectdb");


const app = express();

const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);

app.use(cookieParser());

// middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/payment", paymentRoutes);


// production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // ✅ FIXED
  });
}

connectdb()

// start server
const PORT = process.env.PORT || 5000; // ✅ FIXED

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});