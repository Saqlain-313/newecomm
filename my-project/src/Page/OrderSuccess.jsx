import React, { useEffect } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentById, clearPayment } from "../redux/paymentSlice";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { payment, loading } = useSelector((state) => state.payment);

    useEffect(() => {
        if (id && id !== "undefined") {
            dispatch(getPaymentById(id));
        }
        return () => dispatch(clearPayment());
    }, [dispatch, id]);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F6E7]">
                <FaSpinner className="animate-spin text-5xl text-[#306D29] mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Loading Order Details...</h2>
            </div>
        );
    }

    // No Payment Found
    if (!payment) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F6E7] p-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 bg-[#306D29] text-white rounded-xl font-semibold hover:bg-[#1f4a1f] transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Expected delivery (5 days from order date)
    const expectedDelivery = new Date(payment.createdAt);
    expectedDelivery.setDate(expectedDelivery.getDate() + 5);

    // Status badge
    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === "paid" || s === "success") return "bg-green-100 text-green-700";
        if (s === "pending") return "bg-yellow-100 text-yellow-700";
        if (s === "failed" || s === "cancelled") return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="min-h-screen bg-[#F8F6E7] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mt-3">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Order Placed Successfully! 🎉
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Thank you for shopping with us.
                    </p>
                </div>

                {/* Order Details - Compact Grid */}
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                            <span className="text-gray-500 text-xs">Order ID</span>
                            <p className="font-semibold text-gray-800">#{payment._id?.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Order Date</span>
                            <p className="font-semibold text-gray-800">{formatDate(payment.createdAt)}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Expected Delivery</span>
                            <p className="font-semibold text-gray-800">{formatDate(expectedDelivery)}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Payment</span>
                            <p className="font-semibold text-gray-800 capitalize">{payment.paymentMethod || "N/A"}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Status</span>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(payment.paymentStatus)}`}>
                                {payment.paymentStatus || "Pending"}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs">Total</span>
                            <p className="font-bold text-[#306D29] text-base">₹{payment.totalAmount?.toFixed(2) || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Products - Compact List */}
                {payment.products?.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold text-gray-700 mb-2">
                            Products ({payment.products.length})
                        </h2>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {payment.products.slice(0, 3).map((item, index) => (
                                <div key={item.product || index} className="flex items-center gap-3 border rounded-lg p-2">
                                    <img
                                        src={item.image || "/placeholder-image.png"}
                                        alt={item.name || "Product"}
                                        className="w-10 h-10 rounded-lg object-cover"
                                        onError={(e) => e.target.src = "/placeholder-image.png"}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 text-xs truncate">{item.name || "Product"}</p>
                                        <div className="flex gap-2 text-xs text-gray-500">
                                            {item.size && <span>Size: {item.size}</span>}
                                            <span>Qty: {item.quantity || 1}</span>
                                        </div>
                                    </div>
                                    <div className="font-bold text-[#306D29] text-sm">₹{item.amount?.toFixed(2) || 0}</div>
                                </div>
                            ))}
                            {payment.products.length > 3 && (
                                <p className="text-center text-xs text-gray-400">+ {payment.products.length - 3} more products</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                        onClick={() => navigate("/profilelayout/orders")}
                        className="py-2 text-sm rounded-xl border-2 border-[#306D29] text-[#306D29] font-semibold hover:bg-[#306D29] hover:text-white transition"
                    >
                        📦 My Orders
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="py-2 text-sm rounded-xl bg-[#306D29] text-white font-semibold hover:bg-[#1f4a1f] transition"
                    >
                        🛍️ Shop More
                    </button>
                </div>

                {/* Footer */}
                <p className="mt-3 text-center text-xs text-gray-400">
                    A confirmation email has been sent to your registered email.
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;