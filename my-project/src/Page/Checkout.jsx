import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    FaMapMarkerAlt,
    FaCreditCard,
    FaMoneyBillWave,
    FaMobileAlt,
    FaCheck,
    FaHome,
    FaBuilding,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCity,
    FaMapPin,
    FaTag,
    FaTruck,
    FaShieldAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [selectedAddressType, setSelectedAddressType] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const navigate = useNavigate();

    const { cartItems = [] } = useSelector((state) => state.cart);

    // Saved addresses
    const savedAddresses = useMemo(() => ({
        home: {
            fullName: "John Doe",
            email: "john.doe@email.com",
            phone: "+91 98765 43210",
            secondPhone: "+91 98765 43211",
            address: "123, Green Valley Apartments, Near City Park",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            landmark: "Opposite City Mall"
        },
        office: {
            fullName: "John Doe",
            email: "john.work@company.com",
            phone: "+91 98765 43212",
            secondPhone: "+91 98765 43213",
            address: "456, Business Tower, Sector 5, CBD Belapur",
            city: "Navi Mumbai",
            state: "Maharashtra",
            pincode: "400614",
            landmark: "Near Railway Station"
        }
    }), []);

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("checkoutAddress");
        return savedData
            ? JSON.parse(savedData)
            : {
                fullName: "",
                email: "",
                phone: "",
                secondPhone: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                landmark: "",
            };
    });

    useEffect(() => {
        localStorage.setItem("checkoutAddress", JSON.stringify(formData));
    }, [formData]);

    // Auto-fill address based on selected type
    const handleAddressSelect = useCallback((type) => {
        setSelectedAddressType(type);
        const address = savedAddresses[type];
        if (address) {
            setFormData(address);
        }
    }, [savedAddresses]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Reset selected address type when user manually edits
        if (selectedAddressType) {
            setSelectedAddressType(null);
        }
    };

    // Calculate order totals
    const subtotal = useMemo(() => 
        cartItems.reduce(
            (acc, item) =>
                acc +
                ((item.product?.oldPrice || item.product?.price || 0) *
                    item.quantity),
            0
        ), [cartItems]
    );

    const discount = useMemo(() =>
        cartItems.reduce(
            (acc, item) =>
                acc +
                (((item.product?.oldPrice || 0) -
                    (item.product?.price || 0)) *
                    item.quantity),
            0
        ), [cartItems]
    );

    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal - discount + shipping;

    const handlePlaceOrder = () => {
        // Validate required fields
        const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields');
            return;
        }
        
        navigate('/ordersuccess');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#E7E1B1] to-[#ddd7a8] py-8 md:py-12 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 relative inline-block">
                        Checkout
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"></span>
                    </h1>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8 md:mb-10">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg">
                                <FaCheck className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-xs md:text-sm mt-1 font-medium text-gray-600">Cart</span>
                        </div>

                        <div className="w-12 md:w-20 h-[2px] bg-green-600"></div>

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#306D29] text-white flex items-center justify-center font-bold shadow-lg text-lg md:text-xl">
                                2
                            </div>
                            <span className="text-xs md:text-sm mt-1 font-medium text-gray-800">Checkout</span>
                        </div>

                        <div className="w-12 md:w-20 h-[2px] bg-gray-300"></div>

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-lg md:text-xl">
                                3
                            </div>
                            <span className="text-xs md:text-sm mt-1 font-medium text-gray-500">Confirm</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    
                    {/* Left Side - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Delivery Address */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <FaMapMarkerAlt className="text-[#306D29] text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
                            </div>

                            {/* Address Type Buttons */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button
                                    onClick={() => handleAddressSelect('home')}
                                    className={`group relative overflow-hidden px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                                        selectedAddressType === 'home'
                                            ? 'border-[#306D29] bg-green-50 shadow-lg scale-[1.02]'
                                            : 'border-gray-200 hover:border-[#306D29] hover:bg-gray-50'
                                    }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                        selectedAddressType === 'home' ? 'opacity-100' : ''
                                    }`} />
                                    <span className="relative z-10">
                                        <FaHome className={`text-lg ${
                                            selectedAddressType === 'home' ? 'text-[#306D29]' : 'text-gray-600'
                                        }`} />
                                    </span>
                                    <span className={`relative z-10 font-semibold ${
                                        selectedAddressType === 'home' ? 'text-[#306D29]' : 'text-gray-700'
                                    }`}>
                                        Home
                                    </span>
                                    {selectedAddressType === 'home' && (
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    )}
                                </button>

                                <button
                                    onClick={() => handleAddressSelect('office')}
                                    className={`group relative overflow-hidden px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                                        selectedAddressType === 'office'
                                            ? 'border-[#306D29] bg-green-50 shadow-lg scale-[1.02]'
                                            : 'border-gray-200 hover:border-[#306D29] hover:bg-gray-50'
                                    }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                        selectedAddressType === 'office' ? 'opacity-100' : ''
                                    }`} />
                                    <span className="relative z-10">
                                        <FaBuilding className={`text-lg ${
                                            selectedAddressType === 'office' ? 'text-[#306D29]' : 'text-gray-600'
                                        }`} />
                                    </span>
                                    <span className={`relative z-10 font-semibold ${
                                        selectedAddressType === 'office' ? 'text-[#306D29]' : 'text-gray-700'
                                    }`}>
                                        Office
                                    </span>
                                    {selectedAddressType === 'office' && (
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    )}
                                </button>
                            </div>

                            {/* Address Form */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="secondPhone"
                                        value={formData.secondPhone}
                                        onChange={handleChange}
                                        placeholder="Alternate Phone (Optional)"
                                        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                    />
                                </div>

                                <div className="md:col-span-2 relative">
                                    <textarea
                                        rows="3"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Complete Address"
                                        className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all resize-none"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Pincode"
                                        className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={formData.landmark || ''}
                                        onChange={handleChange}
                                        placeholder="Landmark (Optional)"
                                        className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Address Tips */}
                            {selectedAddressType && (
                                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200 flex items-center gap-2 text-sm text-green-700">
                                    <FaCheck className="text-green-600" />
                                    <span>{selectedAddressType === 'home' ? 'Home' : 'Office'} address auto-filled! You can edit if needed.</span>
                                </div>
                            )}
                        </div>

                        {/* Coupon Section */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-full">
                                    <FaTag className="text-purple-600 text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Apply Coupon</h2>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        placeholder="Enter Coupon Code"
                                        className="w-full border rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all uppercase"
                                        disabled={couponApplied}
                                    />
                                    {couponApplied && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-semibold text-sm">
                                            Applied ✓
                                        </span>
                                    )}
                                </div>
                                <button 
                                    onClick={() => {
                                        if (couponCode) {
                                            setCouponApplied(true);
                                            // Add coupon logic here
                                        }
                                    }}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        couponApplied 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg hover:scale-105'
                                    }`}
                                    disabled={couponApplied}
                                >
                                    {couponApplied ? 'Applied' : 'Apply Coupon'}
                                </button>
                            </div>
                            
                            {couponApplied && (
                                <div className="mt-3 text-sm text-green-600 flex items-center gap-2">
                                    <FaCheck /> Coupon applied successfully! You saved ₹50.
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <FaCreditCard className="text-blue-600 text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: 'cod', icon: FaMoneyBillWave, label: 'Cash On Delivery', color: 'green' },
                                    { id: 'upi', icon: FaMobileAlt, label: 'UPI Payment (GPay, PhonePe, Paytm)', color: 'blue' },
                                    { id: 'card', icon: FaCreditCard, label: 'Credit / Debit Card', color: 'purple' }
                                ].map((method) => {
                                    const Icon = method.icon;
                                    const isSelected = paymentMethod === method.id;
                                    const colors = {
                                        green: 'border-green-500 bg-green-50',
                                        blue: 'border-blue-500 bg-blue-50',
                                        purple: 'border-purple-500 bg-purple-50'
                                    };
                                    return (
                                        <div
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                                                isSelected 
                                                    ? colors[method.color] + ' shadow-md scale-[1.02]' 
                                                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-100'}`}>
                                                    <Icon className={`text-lg ${isSelected ? 'text-gray-800' : 'text-gray-600'}`} />
                                                </div>
                                                <span className="font-medium">{method.label}</span>
                                                {isSelected && (
                                                    <span className="ml-auto text-green-600">
                                                        <FaCheck />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Right Side - Order Summary */}
                    <div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 sticky top-6">
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Order Summary</h2>

                            {/* Product List */}
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex gap-3 border-b pb-3">
                                        <img
                                            src={item.product?.image}
                                            alt={item.product?.name}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-1">{item.product?.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span>Size: {item.size}</span>
                                                <span>Qty: {item.quantity}</span>
                                            </div>
                                            <p className="font-bold text-[#306D29] text-sm">₹{item.product?.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-4" />

                            {/* Price Details */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₹{subtotal}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="font-semibold text-green-600">- ₹{discount}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {shipping === 0 ? (
                                            <span className="text-green-600 flex items-center gap-1">
                                                <FaTruck className="text-xs" /> Free
                                            </span>
                                        ) : (
                                            `₹${shipping}`
                                        )}
                                    </span>
                                </div>

                                {couponApplied && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Coupon Discount</span>
                                        <span className="font-semibold text-green-600">- ₹50</span>
                                    </div>
                                )}

                                <hr />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Amount</span>
                                    <span className="text-[#306D29]">
                                        ₹{couponApplied ? total - 50 : total}
                                    </span>
                                </div>
                            </div>

                            {/* Secure Checkout */}
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                                <FaShieldAlt className="text-green-600" />
                                <span>100% Secure Checkout</span>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-4 py-4 bg-gradient-to-r from-[#306D29] to-[#1a7a1b] text-white rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            {/* <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #306D29;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #1a4a1b;
                }
            `}</style> */}
        </div>
    );
};

export default Checkout;