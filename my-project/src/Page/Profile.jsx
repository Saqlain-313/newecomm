import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserEdit, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Profile = () => {

  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className=" py-8 px-4">

      <div className="max-w-4xl mx-auto">

        <div className="bg-[#FBF5DD] rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="bg-[#306D29] h-32 relative">

            <div
              className="absolute left-1/2 -bottom-12
              transform -translate-x-1/2"
            >
              <img
                src={
                  user?.avatar ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt=""
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>

          </div>

          {/* Content */}
          <div className="pt-16 p-6">

            <h1 className="text-3xl font-bold text-center">
              {user?.name}
            </h1>

            <div className="flex justify-center mt-2">
              <span
                className="flex items-center gap-1
                bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
              >
                <MdVerified />
                Verified Account
              </span>
            </div>

            {loading && (
              <p className="text-center mt-4">
                Loading...
              </p>
            )}

            {error && (
              <p className="text-center text-red-500 mt-4">
                {error}
              </p>
            )}

            {user && (
              <div className="mt-8 grid md:grid-cols-2 gap-6">

                {/* Name */}
                <div
                  className="bg-white rounded-xl p-4
                  shadow-sm"
                >
                  <p className="text-gray-500 text-sm">
                    Full Name
                  </p>

                  <h3 className="font-semibold text-lg">
                    {user.name}
                  </h3>
                </div>

                {/* Email */}
                <div
                  className="bg-white rounded-xl p-4
                  shadow-sm"
                >
                  <p className="text-gray-500 text-sm">
                    Email Address
                  </p>

                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#306D29]" />
                    <h3 className="font-semibold">
                      {user.email}
                    </h3>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className="bg-white rounded-xl p-4
                  shadow-sm"
                >
                  <p className="text-gray-500 text-sm">
                    Mobile Number
                  </p>

                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#306D29]" />
                    <h3 className="font-semibold">
                      {user.phone || "Not Added"}
                    </h3>
                  </div>
                </div>

                {/* Member Since */}
                <div
                  className="bg-white rounded-xl p-4
                  shadow-sm"
                >
                  <p className="text-gray-500 text-sm">
                    Member Since
                  </p>

                  <h3 className="font-semibold">
                    {new Date(user.createdAt)
                      .toLocaleDateString()}
                  </h3>
                </div>

              </div>
            )}

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row
              gap-4 justify-center mt-8"
            >

              <button
                className="flex items-center justify-center gap-2
                bg-[#306D29] text-white px-6 py-3 rounded-xl"
              >
                <FaUserEdit />
                Edit Profile
              </button>

              <button
                className="border border-red-500 bg-red-100
                text-red-500 px-6 py-3 rounded-xl
                hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;