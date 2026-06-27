import React from "react";
import { FaHome, FaBuilding, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Address = () => {

  
  const addresses = [
    {
      _id: 1,
      type: "Home",
      name: "Vishal Kumar Rai",
      phone: "9876543210",
      address:
        "House No. 123, Sector 62, Ghaziabad, Uttar Pradesh - 201301",
      isDefault: true,
    },
    {
      _id: 2,
      type: "Office",
      name: "Vishal Kumar Rai",
      phone: "9876543210",
      address:
        "Tower A, 5th Floor, Noida, Uttar Pradesh - 201301",
      isDefault: false,
    },
  ];

  return (
    <div className="  p-2 lg:p-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            My Addresses
          </h1>

          <button
            className="flex items-center gap-2 px-5 py-3
            bg-[#306D29] text-white rounded-xl
            hover:opacity-90 transition"
          >
            <FaPlus />
            Add New Address
          </button>
        </div>

        {/* Address Cards */}
        <div className="space-y-5">
          {addresses.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm
              hover:shadow-md transition-all border p-5"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-[#E7E1B1]
                  flex items-center justify-center">
                    {item.type === "Home" ? (
                      <FaHome className="text-[#306D29]" />
                    ) : (
                      <FaBuilding className="text-[#306D29]" />
                    )}
                  </div>

                  <div>
                    <h2 className="font-bold text-lg">
                      {item.type}
                    </h2>

                    {item.isDefault && (
                      <span className="text-xs bg-green-100
                      text-green-700 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  {item.phone}
                </p>

                <p className="text-gray-600 mt-2 leading-relaxed">
                  {item.address}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  className="px-5 py-2 border border-[#306D29] bg-green-100
                  text-[#306D29] rounded-lg
                  hover:bg-[#306D29]
                  hover:text-white transition"
                >
                  Edit
                </button>

                <button
                  className="px-5 py-2 border border-red-500 bg-red-100
                  text-red-500 rounded-lg
                  hover:bg-red-500
                  hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Address;