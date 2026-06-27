const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post("/create-order", isAuthenticated, paymentController.createOrder);

router.post("/verify", isAuthenticated, paymentController.verifyPayment);

router.get("/my-payments", isAuthenticated, paymentController.getMyPayments);

router.get("/:id", isAuthenticated, paymentController.getPaymentById);

module.exports = router;