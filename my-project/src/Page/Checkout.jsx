import React, { useState, useEffect, useMemo } from "react";
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
    FaPlus,
    FaSpinner,
    FaTrash,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddresses, updateAddresses, deleteAddress } from "../redux/addressSlice";
import { createOrder, verifyPayment } from "../redux/paymentSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Redux State
    const { cartItems = [] } = useSelector((state) => state.cart);
    const { addresses = [], loading: addressLoading } = useSelector((state) => state.address);
    const { loading: paymentLoading } = useSelector((state) => state.payment);

    // Local State
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressType, setAddressType] = useState("home");
    const [isEditing, setIsEditing] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Form Data
    const [form, setForm] = useState({
        fullName: "", email: "", phone: "", secondPhone: "",
        address: "", city: "", state: "", pincode: "", landmark: ""
    });

    // Load Razorpay script
    useEffect(() => {
        if (window.Razorpay) {
            setRazorpayLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => console.error("Razorpay script failed to load");
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    // Load addresses from backend on mount
    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (selectedAddressId) {
            setSelectedAddressId(null);
            setIsEditing(true);
        }
    };

    // Select saved address
    const selectAddress = (address) => {
        setSelectedAddressId(address._id);
        setAddressType(address.type || "home");
        setForm({
            fullName: address.fullName || "",
            email: address.email || "",
            phone: address.phone || "",
            secondPhone: address.secondPhone || "",
            address: address.address || "",
            city: address.city || "",
            state: address.state || "",
            pincode: address.pincode || "",
            landmark: address.landmark || "",
        });
        setIsEditing(false);
        setShowSaved(false);
    };

    // Save or update address
    const handleSaveAddress = async () => {
        const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
        if (required.some(field => !form[field])) {
            alert('Please fill all required fields');
            return;
        }

        setSaving(true);
        try {
            const existing = addresses.find(a => a._id === selectedAddressId);
            let updatedAddresses;

            if (existing) {
                updatedAddresses = addresses.map(a =>
                    a._id === selectedAddressId 
                        ? { ...a, ...form, type: a.type } 
                        : a
                );
            } else {
                updatedAddresses = [...addresses, {
                    type: addressType,
                    label: form.address.split(',')[0] || 'My Address',
                    ...form
                }];
            }

            await dispatch(updateAddresses(updatedAddresses)).unwrap();
            await dispatch(getAddresses());
            setIsEditing(false);
            alert('Address saved successfully!');
        } catch (error) {
            alert('Failed to save address');
        } finally {
            setSaving(false);
        }
    };

    // Delete address
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this address?')) return;
        
        setDeleting(id);
        try {
            await dispatch(deleteAddress(id)).unwrap();
            await dispatch(getAddresses());
            
            if (selectedAddressId === id) {
                setSelectedAddressId(null);
                setForm({
                    fullName: "", email: "", phone: "", secondPhone: "",
                    address: "", city: "", state: "", pincode: "", landmark: ""
                });
            }
        } catch (error) {
            alert('Failed to delete address');
        } finally {
            setDeleting(null);
        }
    };

    // Reset form
    const resetForm = () => {
        setForm({
            fullName: "", email: "", phone: "", secondPhone: "",
            address: "", city: "", state: "", pincode: "", landmark: ""
        });
        setSelectedAddressId(null);
        setAddressType("home");
        setIsEditing(true);
        setShowSaved(false);
    };

    // Calculate totals
    const subtotal = useMemo(() =>
        cartItems.reduce((acc, item) => acc + ((item.product?.oldPrice || item.product?.price || 0) * item.quantity), 0),
        [cartItems]
    );

    const discount = useMemo(() =>
        cartItems.reduce((acc, item) => acc + (((item.product?.oldPrice || 0) - (item.product?.price || 0)) * item.quantity), 0),
        [cartItems]
    );

    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal - discount + shipping;

    // Place Order
    const placeOrder = async () => {
        const required = ["fullName", "email", "phone", "address", "city", "state", "pincode"];
        if (required.some(field => !form[field])) {
            alert("Please fill all required fields");
            return;
        }

        // Prepare order data
        const orderData = {
            address: {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                secondPhone: form.secondPhone || "",
                address: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                landmark: form.landmark || "",
            },
            items: cartItems.map(item => ({
                productId: item.product?._id || item.productId,
                name: item.product?.name,
                price: item.product?.price,
                quantity: item.quantity,
                size: item.size,
                image: item.product?.image,
            })),
            subtotal: subtotal,
            discount: discount,
            shipping: shipping,
            total: total,
            paymentMethod: paymentMethod === "cod" ? "COD" : "Razorpay",
            couponApplied: couponApplied,
            couponCode: couponApplied ? couponCode : null,
        };

        // COD Payment
        if (paymentMethod === "cod") {
            try {
                const result = await dispatch(createOrder(orderData)).unwrap();
                
                console.log("COD Response:", result);

                if (result.success && result.payment) {
                    alert("Order Placed Successfully!");
                    
                    // Get payment ID from response
                    const paymentId = result.payment._id || result.payment.id;
                    
                    if (paymentId) {
                        navigate(`/ordersuccess/${paymentId}`);
                    } else {
                        // Fallback: navigate with order ID
                        const orderId = result.order?._id || result.order?.id || "success";
                        navigate(`/ordersuccess/${orderId}`);
                    }
                } else {
                    alert(result.message || "Failed to place order");
                }
            } catch (error) {
                console.error("COD Order Error:", error);
                alert(error.message || "Failed to place order. Please try again.");
            }
            return;
        }

        // Razorpay Payment
        if (!razorpayLoaded) {
            alert("Payment system is loading. Please wait...");
            return;
        }

        try {
            // Create order for Razorpay
            const result = await dispatch(createOrder(orderData)).unwrap();
            
            console.log("Razorpay Response:", result);

            if (!result.success || !result.order) {
                alert(result.message || "Unable to create order");
                return;
            }

            const { order, payment, key } = result;

            // Get payment ID for navigation
            const paymentId = payment?._id || payment?.id || order?.id;

            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency || "INR",
                name: "Glamorous",
                description: "Order Payment",
                order_id: order.id,
                prefill: {
                    name: form.fullName,
                    email: form.email,
                    contact: form.phone,
                },
                theme: {
                    color: "#306D29",
                },
                handler: async function(response) {
                    try {
                        const verify = await dispatch(verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            paymentId: paymentId // Send the payment ID
                        })).unwrap();

                        console.log("Verify Response:", verify);

                        if (verify.success) {
                            alert("Payment Successful!");
                            
                            // Get payment ID from verification response
                            const verifiedPaymentId = verify.payment?._id || 
                                                       verify.payment?.id || 
                                                       paymentId;
                            
                            navigate(`/ordersuccess/${verifiedPaymentId}`);
                        } else {
                            alert("Payment Verification Failed");
                        }
                    } catch (error) {
                        console.error("Verification Error:", error);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                modal: {
                    ondismiss: function() {
                        alert("Payment Cancelled");
                    }
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert(error.message || "Failed to initiate payment. Please try again.");
        }
    };

    // Helper: Get address icon
    const getIcon = (addr) => {
        if (addr.type === 'home') return <FaHome className="text-green-600" />;
        if (addr.type === 'office') return <FaBuilding className="text-blue-600" />;
        return <FaMapMarkerAlt className="text-purple-600" />;
    };

    // Helper: Get address label
    const getLabel = (addr) => {
        if (addr.type === 'home') return 'Home';
        if (addr.type === 'office') return 'Office';
        return addr.label || 'Address';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#E7E1B1] to-[#ddd7a8] py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Address Section */}
                        <div className="bg-white/90 rounded-2xl p-6 shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-[#306D29] text-xl" />
                                    <h2 className="text-2xl font-bold">Delivery Address</h2>
                                </div>
                                <button
                                    onClick={() => setShowSaved(!showSaved)}
                                    className="text-sm text-green-600 font-medium"
                                >
                                    {showSaved ? 'Hide Saved' : 'Show Saved'}
                                </button>
                            </div>

                            {/* Saved Addresses */}
                            {showSaved && (
                                <div className="mb-6">
                                    {addressLoading ? (
                                        <div className="text-center py-8">
                                            <FaSpinner className="animate-spin text-2xl text-green-600 mx-auto" />
                                        </div>
                                    ) : addresses.length === 0 ? (
                                        <p className="text-center text-gray-500 py-4">No saved addresses</p>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {addresses.map(addr => (
                                                <div
                                                    key={addr._id}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                                                        selectedAddressId === addr._id
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                                >
                                                    <div className="flex justify-between">
                                                        <div onClick={() => selectAddress(addr)} className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                {getIcon(addr)}
                                                                <span className="font-semibold">{getLabel(addr)}</span>
                                                                {selectedAddressId === addr._id && (
                                                                    <span className="text-xs bg-green-100 text-green-600 px-2 rounded-full">Selected</span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-600">{addr.address}, {addr.city}</p>
                                                            <p className="text-xs text-gray-400">{addr.pincode}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(addr._id)}
                                                            disabled={deleting === addr._id}
                                                            className="text-gray-400 hover:text-red-500"
                                                        >
                                                            {deleting === addr._id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        onClick={resetForm}
                                        className="mt-3 w-full py-3 border-2 border-dashed rounded-xl text-gray-500 hover:text-green-600 hover:border-green-500 transition flex items-center justify-center gap-2"
                                    >
                                        <FaPlus /> Add New Address
                                    </button>
                                </div>
                            )}

                            {/* Address Type Selection */}
                            {isEditing && !selectedAddressId && (
                                <div className="mb-4">
                                    <label className="text-sm font-medium block mb-2">Address Type</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['home', 'office'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setAddressType(type)}
                                                className={`px-4 py-2 rounded-xl border-2 transition ${
                                                    addressType === type
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-gray-200'
                                                }`}
                                            >
                                                {type === 'home' ? <FaHome className="inline mr-2" /> : <FaBuilding className="inline mr-2" />}
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Address Form */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField icon={FaUser} name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
                                <InputField icon={FaEnvelope} name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" />
                                <InputField icon={FaPhone} name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" type="tel" />
                                <InputField icon={FaPhone} name="secondPhone" value={form.secondPhone} onChange={handleChange} placeholder="Alternate Phone (Optional)" type="tel" />
                                <div className="md:col-span-2">
                                    <textarea name="address" value={form.address} onChange={handleChange} rows="3" placeholder="Complete Address" className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-500" required />
                                </div>
                                <InputField icon={FaCity} name="city" value={form.city} onChange={handleChange} placeholder="City" />
                                <InputField icon={FaMapPin} name="state" value={form.state} onChange={handleChange} placeholder="State" />
                                <InputField name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />
                                <InputField name="landmark" value={form.landmark || ''} onChange={handleChange} placeholder="Landmark (Optional)" />
                            </div>

                            {/* Save Button */}
                            {(isEditing || selectedAddressId) && form.fullName && form.address && (
                                <button
                                    onClick={handleSaveAddress}
                                    disabled={saving}
                                    className="mt-4 w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-70"
                                >
                                    {saving ? <><FaSpinner className="animate-spin inline mr-2" /> Saving...</> : <><FaPlus className="inline mr-2" /> {selectedAddressId ? 'Update Address' : 'Save Address'}</>}
                                </button>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white/90 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <FaCreditCard className="text-blue-600" /> Payment Method
                            </h2>
                            {['cod', 'upi', 'card'].map(method => {
                                const icons = { cod: FaMoneyBillWave, upi: FaMobileAlt, card: FaCreditCard };
                                const labels = { cod: 'Cash On Delivery', upi: 'UPI Payment', card: 'Credit/Debit Card' };
                                const Icon = icons[method];
                                return (
                                    <div
                                        key={method}
                                        onClick={() => setPaymentMethod(method)}
                                        className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                                            paymentMethod === method
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="text-lg" />
                                            <span>{labels[method]}</span>
                                            {paymentMethod === method && <FaCheck className="ml-auto text-green-600" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Coupon */}
                        <div className="bg-white/90 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <FaTag className="text-purple-600" /> Apply Coupon
                            </h2>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    placeholder="Enter Coupon Code"
                                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                                    disabled={couponApplied}
                                />
                                <button
                                    onClick={() => couponCode && setCouponApplied(true)}
                                    disabled={couponApplied}
                                    className={`px-6 py-3 rounded-xl font-semibold transition ${
                                        couponApplied ? 'bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}
                                >
                                    {couponApplied ? 'Applied ✓' : 'Apply'}
                                </button>
                            </div>
                            {couponApplied && <p className="mt-2 text-sm text-green-600">Coupon applied! You saved ₹50.</p>}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div>
                        <div className="bg-white/90 rounded-2xl p-6 shadow-xl sticky top-6">
                            <h2 className="text-2xl font-bold text-center mb-6">Order Summary</h2>

                            {/* Products */}
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex gap-3 border-b pb-3">
                                        <img src={item.product?.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-1">{item.product?.name}</p>
                                            <p className="text-sm font-bold text-green-700">₹{item.product?.price}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-4" />

                            {/* Price Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                                <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                                {couponApplied && <div className="flex justify-between text-green-600"><span>Coupon</span><span>-₹50</span></div>}
                                <hr />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-green-700">₹{couponApplied ? total - 50 : total}</span>
                                </div>
                            </div>

                            <button
                                onClick={placeOrder}
                                disabled={paymentLoading}
                                className="w-full mt-6 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50"
                            >
                                {paymentLoading ? (
                                    <>
                                        <FaSpinner className="inline animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    paymentMethod === "cod" ? "Place Order" : "Pay Now"
                                )}
                            </button>

                            <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                                <FaShieldAlt className="text-green-600" /> Secure Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Input Component
const InputField = ({ icon: Icon, name, value, onChange, placeholder, type = "text" }) => (
    <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border rounded-xl ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 outline-none focus:border-green-500 transition`}
        />
    </div>
);

export default Checkout;