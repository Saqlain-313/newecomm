const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");
const auth = require("../middlewares/auth");

router.post("/create-order", auth, paymentController.createOrder);

router.post("/verify", auth, paymentController.verifyPayment);

router.get("/my-payments", auth, paymentController.getMyPayments);

router.get("/:id", auth, paymentController.getPaymentById);

module.exports = router;