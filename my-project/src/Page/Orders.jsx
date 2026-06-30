import React, { useEffect } from "react";
import { FaBox, FaTruck, FaCheckCircle, FaEye, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMyPayments } from "../redux/paymentSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { payments = [], loading } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(getMyPayments());
    }, [dispatch]);

    // Navigate to product detail page
    const goToProduct = (productId) => {
        if (productId) {
            navigate(`/product/${productId}`);
        }
    };

    // Navigate to order detail page (optional)
    const goToOrderDetail = (orderId) => {
        navigate(`/ordersuccess/${orderId}`);
    };

    // Status Badge Component
    const StatusBadge = ({ status }) => {
        const config = {
            Processing: { icon: FaBox, bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
            Shipped: { icon: FaTruck, bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
            Delivered: { icon: FaCheckCircle, bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
            Pending: { icon: FaBox, bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
            Paid: { icon: FaCheckCircle, bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
            Cancelled: { icon: FaBox, bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
        };

        const { icon: Icon, bg, text, dot } = config[status] || config.Processing;

        return (
            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${bg} ${text}`}>
                <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
                <Icon className="text-sm" />
                {status}
            </span>
        );
    };

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F6E7]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#306D29] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    // Empty State
    if (!payments || payments.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F6E7] p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 mb-6">Start shopping and place your first order!</p>
                    <button onClick={() => navigate("/")} className="w-full py-3 bg-[#306D29] text-white rounded-xl font-semibold hover:bg-[#1f4a1f] transition">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span>My Orders</span>
                        <span className="text-sm bg-[#306D29] text-white px-3 py-1 rounded-full">
                            {payments.length}
                        </span>
                    </h1>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {payments.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-100"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Image - Click to go to product */}
                                <div 
                                    className="sm:w-24 sm:h-24 w-full h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
                                    onClick={() => goToProduct(order.products?.[0]?.product)}
                                >
                                    <img
                                        src={order.products?.[0]?.image || "/placeholder.png"}
                                        alt={order.products?.[0]?.name || "Product"}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                        onError={(e) => e.target.src = "/placeholder.png"}
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                        <div>
                                            <h3 
                                                className="font-semibold text-gray-800 text-lg truncate lg:w-[500px] w-[200px] cursor-pointer hover:text-[#306D29] transition"
                                                onClick={() => goToProduct(order.products?.[0]?.product)}
                                            >
                                                {order.products?.[0]?.name || "Order"}
                                            </h3>
                                            {order.products?.length > 1 && (
                                                <p className="text-sm text-gray-500">
                                                    + {order.products.length - 1} more items
                                                </p>
                                            )}
                                            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-xs" />
                                                    {formatDate(order.createdAt)}
                                                </span>
                                                <span className="text-xs">•</span>
                                                <span className="font-mono text-xs">
                                                    #{order._id?.slice(-8).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusBadge status={order.paymentStatus || "Processing"} />
                                        </div>
                                    </div>

                                    {/* Bottom Row */}
                                    <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1 font-bold text-[#306D29] text-lg">
                                            <FaRupeeSign className="text-sm" />
                                            {order.totalAmount?.toFixed(2) || 0}
                                        </div>
                                        <div className="flex gap-2">
                                            {/* View Order Details Button */}
                                            <button
                                                onClick={() => goToOrderDetail(order._id)}
                                                className="flex items-center gap-2 px-4 py-1.5 bg-[#306D29] text-white rounded-lg text-sm font-medium hover:bg-[#1f4a1f] transition"
                                            >
                                                <FaEye className="text-xs" />
                                                View Order
                                            </button>
                                            
                                            {/* View Product Button */}
                                            {order.products?.[0]?.product && (
                                                <button
                                                    onClick={() => goToProduct(order.products[0].product)}
                                                    className="flex items-center gap-2 px-4 py-1.5 border-2 border-[#306D29] text-[#306D29] rounded-lg text-sm font-medium hover:bg-[#306D29] hover:text-white transition"
                                                >
                                                    View Product
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* All Products List */}
                                    {order.products?.length > 1 && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-xs text-gray-500 mb-2">Other items in this order:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {order.products.slice(1, 4).map((item, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition"
                                                        onClick={() => goToProduct(item.product)}
                                                    >
                                                        <img 
                                                            src={item.image || "/placeholder.png"} 
                                                            alt="" 
                                                            className="w-6 h-6 rounded object-cover"
                                                            onError={(e) => e.target.src = "/placeholder.png"}
                                                        />
                                                        <span className="text-xs text-gray-600 truncate max-w-[100px]">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                ))}
                                                {order.products.length > 4 && (
                                                    <span className="text-xs text-gray-400">+{order.products.length - 4} more</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;