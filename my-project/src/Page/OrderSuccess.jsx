import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F6E7] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-5 rounded-full">
            <FaCheckCircle className="text-6xl text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-3">
            Thank you for shopping with us.
            Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-600">Order ID</span>
            <span className="font-semibold">
              #ORD123456
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Expected Delivery
            </span>
            <span className="font-semibold">
              3 - 5 Days
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Payment Method
            </span>
            <span className="font-semibold">
              Cash On Delivery
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Total Amount
            </span>
            <span className="font-bold text-[#306D29] text-xl">
              ₹4,999
            </span>
          </div>

        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => navigate("/my-orders")}
            className="py-3 rounded-xl border border-[#306D29]
            text-[#306D29] font-semibold hover:bg-[#306D29]
            hover:text-white transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="py-3 rounded-xl bg-[#306D29]
            text-white font-semibold hover:opacity-90"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;