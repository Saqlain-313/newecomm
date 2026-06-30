import React, { useEffect, useState } from "react";
import { FaHome, FaBuilding, FaPlus, FaSpinner, FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses, deleteAddress, updateAddresses } from "../redux/addressSlice";

const Address = () => {
  const dispatch = useDispatch();
  const { addresses = [], loading } = useSelector((state) => state.address);
  const [deleting, setDeleting] = useState(null);

  // Fetch addresses from backend on mount
  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  // Delete address
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    
    setDeleting(id);
    try {
      await dispatch(deleteAddress(id)).unwrap();
      await dispatch(getAddresses()); // Refresh list
    } catch (error) {
      alert("Failed to delete address");
    } finally {
      setDeleting(null);
    }
  };

  // Set default address
  const handleSetDefault = async (id) => {
    try {
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr._id === id
      }));
      await dispatch(updateAddresses(updatedAddresses)).unwrap();
      await dispatch(getAddresses());
    } catch (error) {
      alert("Failed to set default address");
    }
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#306D29] text-white rounded-xl hover:opacity-90 transition">
            <FaPlus /> Add New Address
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin text-4xl text-[#306D29] mx-auto" />
            <p className="mt-2 text-gray-500">Loading addresses...</p>
          </div>
        ) : addresses.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500">No addresses saved yet</p>
            <button className="mt-4 text-[#306D29] font-semibold hover:underline">
              Add your first address
            </button>
          </div>
        ) : (
          /* Address Cards */
          <div className="space-y-5">
            {addresses.map((addr) => (
              <div key={addr._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border p-5">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E7E1B1] flex items-center justify-center">
                      {addr.type === "home" ? (
                        <FaHome className="text-[#306D29]" />
                      ) : (
                        <FaBuilding className="text-[#306D29]" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg capitalize">{addr.type}</h2>
                      {addr.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{addr.fullName}</h3>
                  <p className="text-gray-600 mt-1">{addr.phone}</p>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-5">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr._id)}
                      className="px-5 py-2 border border-blue-500 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    >
                      Set Default
                    </button>
                  )}
                  <button className="px-5 py-2 border border-[#306D29] bg-green-100 text-[#306D29] rounded-lg hover:bg-[#306D29] hover:text-white transition flex items-center gap-2">
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    disabled={deleting === addr._id}
                    className="px-5 py-2 border border-red-500 bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {deleting === addr._id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Address Count */}
        {addresses.length > 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            Total: {addresses.length} address{addresses.length > 1 ? 'es' : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default Address;