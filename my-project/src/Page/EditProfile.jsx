import React from 'react'
import { useSelector } from 'react-redux';
const EditProfile = () => {

  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="max-w-5xl mx-auto p-4">

  <div className="bg-[#FBF5DD] rounded-3xl shadow-sm overflow-hidden">

    {/* Header */}
    <div className="bg-[#306D29] h-36 relative">

      <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">

        <div className="relative">

          <img
            src={user?.avatar}
            alt=""
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <label
            className="absolute bottom-1 right-1
            bg-white p-2 rounded-full cursor-pointer shadow"
          >
            📷
            <input
              type="file"
              className="hidden"
            />
          </label>

        </div>

      </div>

    </div>

    {/* Form */}
    <div className="pt-20 p-8">

      <h2 className="text-3xl font-bold mb-8">
        Edit Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            className="w-full p-4 border rounded-xl outline-none"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            className="w-full p-4 border rounded-xl outline-none"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="text"
            className="w-full p-4 border rounded-xl outline-none"
            placeholder="Enter phone"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Date of Birth
          </label>

          <input
            type="date"
            className="w-full p-4 border rounded-xl outline-none"
          />
        </div>

      </div>

      {/* Gender */}
      <div className="mt-6">

        <label className="block mb-3 font-medium">
          Gender
        </label>

        <div className="flex gap-6">

          <label className="flex items-center gap-2">
            <input type="radio" />
            Male
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" />
            Female
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" />
            Other
          </label>

        </div>

      </div>

      {/* Security */}
      <div className="mt-10">

        <h3 className="text-xl font-bold mb-5">
          Change Password
        </h3>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="password"
            placeholder="Current Password"
            className="p-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="New Password"
            className="p-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="p-4 border rounded-xl"
          />

        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-10">

        <button
          className="px-8 py-3 border rounded-xl"
        >
          Cancel
        </button>

        <button
          className="px-8 py-3 bg-[#306D29]
          text-white rounded-xl hover:opacity-90"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>

</div>
  )
}

export default EditProfile