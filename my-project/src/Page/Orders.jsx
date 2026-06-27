import React from "react";
import { FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";

const MyOrders = () => {
  const orders = [
    {
      _id: "ORD12345",
      date: "20 June 2026",
      status: "Processing",
      total: 2499,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      productName: "Maxi Dress",
    },
    {
      _id: "ORD12346",
      date: "18 June 2026",
      status: "Shipped",
      total: 1999,
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
      productName: "Summer Dress",
    },
  ];

  return (
    <div className=" py-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl text-center font-bold mb-4">
          My Orders
        </h1>

        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/65 rounded-2xl shadow-sm hover:shadow-md transition-all p-2 lg:p-5"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-5">

                {/* Left */}
                <div className="flex gap-4">
                  <img
                    src={order.image}
                    alt=""
                    className="w-28 h-28 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="font-bold text-xl">
                      {order.productName}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Order ID: {order._id}
                    </p>

                    <p className="text-gray-500">
                      Placed on {order.date}
                    </p>

                    <p className="font-bold text-[#306D29] text-xl mt-2">
                      ₹{order.total}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex lg:flex-col justify-between items-end">

                  {order.status === "Processing" && (
                    <div className="flex lg:px-4 px-2 py-2 bg-yellow-100 rounded-lg items-center gap-2 text-yellow-400 font-semibold">
                      <FaBox />
                      Processing
                    </div>
                  )}

                  {order.status === "Shipped" && (
                    <div className="flex items-center gap-2 px-6 py-2 bg-blue-100 rounded-lg text-blue-600 font-semibold">
                      <FaTruck />
                      Shipped
                    </div>
                  )}

                  {order.status === "Delivered" && (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <FaCheckCircle />
                      Delivered
                    </div>
                  )}

                  <button
                    className="mt-4 lg:px-6 px-3 py-2 bg-[#306D29]
                    text-white rounded-lg hover:opacity-90"
                  >
                    View Details
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default MyOrders;