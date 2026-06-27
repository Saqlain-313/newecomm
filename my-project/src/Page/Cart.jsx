import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiMiniMinusSmall, HiPlusSmall } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { deleteCart, getCart, clearAllCart, increaseQty, decreaseQty } from '../redux/cartSlice';
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await dispatch(getCart());
      setLoading(false);
    };
    fetchCart();
  }, [dispatch]);

  const handleDeleteCart = (id) => {
    dispatch(deleteCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearAllCart());
    }
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Calculations
  const totalItems = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const totalDiscount = cartItems?.reduce(
    (total, item) => total + ((item.product.oldPrice - item.product.price) * item.quantity),
    0
  ) || 0;
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ) || 0;
  const subtotal = totalPrice + totalDiscount;
  const savingsPercentage = Math.round((totalDiscount / subtotal) * 100) || 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#f0ebc9] to-[#d8d19c] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#f0ebc9] to-[#d8d19c]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-sm sm:text-base mb-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">Shopping Cart</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3">
            <span>Shopping Cart</span>
            {cartItems?.length > 0 && (
              <span className="text-sm bg-black/10 text-gray-600 px-3 py-1 rounded-full">
                {totalItems} items
              </span>
            )}
          </h1>
          
          {cartItems?.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearCart}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <RxCross2 className="text-lg" />
              Clear Cart
            </motion.button>
          )}
        </div>

        {/* Empty Cart */}
        {cartItems?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Your Cart Is Empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Left Side - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  layout
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50"
                >
                  {/* REDUCED PADDING & SMALLER SIZES */}
                  <div className="flex flex-row gap-3 p-3 sm:p-4 lg:p-5">
                    
                    {/* Image - Left Side - REDUCED SIZE */}
                    <div className="relative w-[80px] sm:w-[120px] md:w-[140px] lg:w-[150px] shrink-0">
                      <div className="relative overflow-hidden rounded-xl bg-gray-100 h-full">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-[100px] sm:h-[140px] md:h-[160px] lg:h-[170px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                        {item.product.discount && (
                          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white text-[8px] sm:text-[10px] lg:text-xs font-bold px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded-md">
                            {item.product.discount} Off
                          </div>
                        )}
                      </div>
                      
                      {/* Mobile Quantity */}
                      <div className="flex sm:hidden items-center justify-between w-full h-8 px-2 bg-gray-100 rounded-lg mt-2">
                        <button
                          onClick={() => dispatch(decreaseQty(item._id))}
                          className="hover:bg-gray-200 p-0.5 rounded-full transition-colors"
                        >
                          <HiMiniMinusSmall className="text-base" />
                        </button>
                        <span className="font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQty(item._id))}
                          className="hover:bg-gray-200 p-0.5 rounded-full transition-colors"
                        >
                          <HiPlusSmall className="text-base" />
                        </button>
                      </div>
                    </div>

                    {/* Content - Right Side - REDUCED SIZES */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start gap-1 sm:gap-2">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xs sm:text-base lg:text-lg font-bold text-gray-800 line-clamp-2 sm:line-clamp-1">
                            {item.product.name}
                          </h2>
                          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 line-clamp-1 mt-0.5 hidden xs:block">
                            {item.product.description}
                          </p>
                        </div>
                        
                        {/* Remove Button - SMALLER */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteCart(item._id)}
                          className="shrink-0 w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center bg-gray-100 hover:bg-red-500 rounded-full transition-all duration-300 group"
                        >
                          <RxCross2 className="text-xs sm:text-base lg:text-lg text-gray-600 group-hover:text-white transition-colors duration-300" />
                        </motion.button>
                      </div>

                      {/* Price Section - SMALLER */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3 mt-0.5 sm:mt-1 lg:mt-2">
                        {item.product.oldPrice && (
                          <span className="text-[10px] sm:text-xs lg:text-sm text-gray-400 line-through">
                            ₹{item.product.oldPrice}
                          </span>
                        )}
                        <span className="text-sm sm:text-lg lg:text-xl font-bold text-blue-600">
                          ₹{item.product.price}
                        </span>
                        {item.product.discount && (
                          <span className="text-[8px] sm:text-[10px] lg:text-xs font-semibold text-green-600 bg-green-50 px-1 sm:px-1.5 lg:px-2 py-0.5 rounded">
                            Save ₹{item.product.oldPrice - item.product.price}
                          </span>
                        )}
                      </div>

                      {/* Rating & Size - SMALLER */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-4 mt-0.5 sm:mt-1 lg:mt-2">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <span className="font-semibold text-[10px] sm:text-xs lg:text-sm">{item.product.rating}</span>
                          <FaStar className="text-yellow-400 text-[8px] sm:text-[10px] lg:text-sm" />
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2">
                          <span className="text-[8px] sm:text-[10px] lg:text-sm font-medium text-gray-600">Size:</span>
                          <span className="px-1.5 sm:px-2 lg:px-3 py-0.5 bg-gray-100 rounded-full text-[8px] sm:text-[10px] lg:text-sm font-semibold">
                            {item.size}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleWishlist(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                        >
                          {wishlist.includes(item._id) ? (
                            <FaHeart className="text-red-500 text-xs sm:text-base lg:text-lg" />
                          ) : (
                            <FaRegHeart className="text-xs sm:text-base lg:text-lg" />
                          )}
                        </button>
                      </div>

                      {/* Delivery - Hidden on mobile */}
                      <div className="hidden sm:flex items-center gap-1 lg:gap-2 mt-1 lg:mt-2 text-[10px] lg:text-sm text-gray-600">
                        <CiDeliveryTruck className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-600 shrink-0" />
                        <span className="truncate">{item.product.delivery || 'Free delivery'}</span>
                        <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gray-300 rounded-full" />
                        <IoShieldCheckmarkOutline className="text-green-600 text-xs sm:text-base" />
                        <span className="hidden lg:inline">Secure</span>
                      </div>

                      {/* Quantity & Total - SMALLER */}
                      <div className="flex items-center justify-between mt-1 sm:mt-2 lg:mt-3 pt-1 sm:pt-2 lg:pt-3 border-t border-gray-100">
                        <div className="hidden sm:flex items-center gap-1 lg:gap-3">
                          <span className="text-[10px] lg:text-sm font-medium text-gray-600">Qty:</span>
                          <div className="flex items-center justify-between w-20 sm:w-24 lg:w-28 h-8 sm:h-9 lg:h-10 px-1 sm:px-2 bg-gray-100 rounded-lg">
                            <button
                              onClick={() => dispatch(decreaseQty(item._id))}
                              className="hover:bg-gray-200 p-0.5 sm:p-1 rounded-full transition-colors"
                            >
                              <HiMiniMinusSmall className="text-base sm:text-lg lg:text-xl" />
                            </button>
                            <span className="font-semibold text-sm sm:text-base lg:text-lg min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(increaseQty(item._id))}
                              className="hover:bg-gray-200 p-0.5 sm:p-1 rounded-full transition-colors"
                            >
                              <HiPlusSmall className="text-base sm:text-lg lg:text-xl" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 ml-auto">
                          <span className="text-[8px] sm:text-[10px] lg:text-sm text-gray-500">Total:</span>
                          <span className="text-xs sm:text-base lg:text-lg font-bold text-green-700">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Order Summary - REDUCED SIZE */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-6 bg-white rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 border border-white/50"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 border-b pb-3 lg:pb-4 flex items-center gap-2">
                  <span>Order Summary</span>
                  <span className="text-xs lg:text-sm bg-blue-50 text-blue-600 px-2 lg:px-3 py-0.5 rounded-full">
                    {totalItems} items
                  </span>
                </h2>

                <div className="space-y-2 sm:space-y-3 lg:space-y-4 mt-3 sm:mt-4 lg:mt-6">
                  <div className="flex justify-between text-sm lg:text-base text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-sm lg:text-base text-green-600">
                    <span className="flex items-center gap-0.5 lg:gap-1">
                      <CiDiscount1 className="text-base lg:text-lg" />
                      Discount
                    </span>
                    <span className="font-medium">-₹{totalDiscount}</span>
                  </div>

                  <div className="flex justify-between text-sm lg:text-base text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg lg:text-xl font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{totalPrice}</span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-2 lg:p-3 rounded-xl border border-green-200">
                      <p className="text-xs lg:text-sm text-green-700 flex items-center gap-1 lg:gap-2 justify-center">
                        <span className="text-base lg:text-lg">🎉</span>
                        Saving ₹{totalDiscount} ({savingsPercentage}%)
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 lg:space-y-3 mt-2">
                    <button className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2.5 sm:py-3 lg:py-3.5 rounded-xl font-semibold text-sm lg:text-base hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <Link to="/checkout" className="block">
                        Proceed to Checkout
                      </Link>
                    </button>
                    
                    <Link
                      to="/"
                      className="block w-full text-center text-xs lg:text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Badges - SMALLER */}
                  <div className="flex justify-center items-center gap-2 lg:gap-4 pt-3 lg:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-[8px] sm:text-[10px] lg:text-xs text-gray-500">
                      <IoShieldCheckmarkOutline className="text-green-600 text-sm lg:text-lg" />
                      Secure
                    </div>
                    <div className="w-px h-3 lg:h-4 bg-gray-200" />
                    <div className="flex items-center gap-0.5 lg:gap-1 text-[8px] sm:text-[10px] lg:text-xs text-gray-500">
                      <CiDeliveryTruck className="text-green-600 text-sm lg:text-lg" />
                      Free Ship
                    </div>
                    <div className="w-px h-3 lg:h-4 bg-gray-200" />
                    <div className="flex items-center gap-0.5 lg:gap-1 text-[8px] sm:text-[10px] lg:text-xs text-gray-500">
                      <span className="text-sm lg:text-lg">💳</span>
                      Secure Pay
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;