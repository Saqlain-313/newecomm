import React from "react";

const AddressForm = ({
  showModal,
  setShowModal,
  editingAddress,
  setEditingAddress,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-[#FBF5DD] w-full max-w-2xl rounded-2xl p-6 mx-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>

          <button
            onClick={() => {
              setShowModal(false);
              setEditingAddress(null);
            }}
            className="text-3xl font-bold"
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name + Phone */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="border rounded-lg p-3 outline-none"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="border rounded-lg p-3 outline-none"
            />

          </div>

          {/* Address 1 */}
          <input
            type="text"
            placeholder="Address Line 1"
            value={formData.address1}
            onChange={(e) =>
              setFormData({
                ...formData,
                address1: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 outline-none"
          />

          {/* Address 2 */}
          <input
            type="text"
            placeholder="Address Line 2"
            value={formData.address2}
            onChange={(e) =>
              setFormData({
                ...formData,
                address2: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 outline-none"
          />

          {/* City State Pincode */}
          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              className="border rounded-lg p-3 outline-none"
            />

            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value,
                })
              }
              className="border rounded-lg p-3 outline-none"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pincode: e.target.value,
                })
              }
              className="border rounded-lg p-3 outline-none"
            />

          </div>

          {/* Address Type */}
          <div>

            <label className="font-semibold">
              Address Type
            </label>

            <div className="flex gap-6 mt-2">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.type === "Home"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      type: "Home",
                    })
                  }
                />
                Home
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.type === "Office"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      type: "Office",
                    })
                  }
                />
                Office
              </label>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingAddress(null);
              }}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-[#306D29] text-white rounded-lg"
            >
              {editingAddress
                ? "Update Address"
                : "Save Address"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddressForm;