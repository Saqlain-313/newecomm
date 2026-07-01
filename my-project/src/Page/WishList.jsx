import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist, getWishlist } from '../redux/wishlistSlice'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaHeart, FaTrash, FaShoppingBag, FaStar, FaStarHalfAlt,
  FaArrowLeft, FaRegHeart
} from 'react-icons/fa'
import { IoBagAddOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import { addToCart } from '../redux/cartSlice'

const Wishlist = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toast, setToast] = useState(null)

    useEffect(() => {
        dispatch(getWishlist())
    }, [dispatch])

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems)

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const handleRemove = async (itemId, productName) => {
        try {
            await dispatch(removeFromWishlist(itemId))
            showToast(`Removed "${productName}" from wishlist`, 'info')
        } catch {
            showToast('Failed to remove item', 'error')
        }
    }

    const handleAddToCart = async (product) => {
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity: 1,
                size: product.sizes?.[0] || 'M',
            })).unwrap()
            showToast(`Added "${product.name}" to cart!`, 'success')
            navigate('/cart')
        } catch {
            showToast('Failed to add to cart', 'error')
        }
    }

    const handleMoveToCart = async (item) => {
        await handleAddToCart(item.productId)
        await handleRemove(item._id, item.productId?.name)
    }

    const renderStars = (rating) => {
        const stars = []
        for (let i = 0; i < Math.floor(rating || 0); i++) {
            stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />)
        }
        if (rating % 1 >= 0.5) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />)
        }
        return stars
    }

    // Empty State
    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <FaRegHeart className="text-5xl text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-6">Wishlist is Empty</h2>
                    <p className="text-gray-500 mt-2">Start adding your favorite items!</p>
                    <Link to="/">
                        <button className="mt-6 px-8 py-3 bg-[#306D29] text-white rounded-xl hover:bg-[#1f4a1f] transition">
                            Start Shopping
                        </button>
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-6 px-4">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-6 right-6 z-50 bg-white shadow-xl rounded-xl px-6 py-4 border-2 border-green-500"
                    >
                        <p className="font-medium">{toast.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaHeart className="text-red-500" />
                            My Wishlist
                            <span className="text-sm bg-gray-200 px-3 py-1 rounded-full ml-2">
                                {wishlistItems.length}
                            </span>
                        </h1>
                    </div>
                    <Link to="/">
                        <button className="px-6 py-2 bg-[#306D29] text-white rounded-lg hover:bg-[#1f4a1f] transition flex items-center gap-2">
                            <FaArrowLeft className="text-sm" /> Continue Shopping
                        </button>
                    </Link>
                </div>

                {/* List View - No Cards */}
                <div className="space-y-3">
                    {wishlistItems.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-wrap items-center gap-4"
                        >
                            {/* Image */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                <img
                                    src={item.productId?.image || item.productId?.images?.[0]}
                                    alt={item.productId?.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-[150px]">
                                <h3 className="font-semibold text-gray-800 hover:text-[#306D29] transition line-clamp-1">
                                    {item.productId?.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-1">
                                    {item.productId?.description}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    {renderStars(item.productId?.rating || 4.5)}
                                    <span className="text-xs text-gray-400">({item.productId?.reviews || 0})</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-center min-w-[100px]">
                                <p className="text-lg font-bold text-[#306D29]">₹{item.productId?.price}</p>
                                {item.productId?.oldPrice && (
                                    <p className="text-sm text-gray-400 line-through">₹{item.productId?.oldPrice}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {item.productId?.discount > 0 && (
                                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                                        {item.productId.discount}% OFF
                                    </span>
                                )}
                                {item.productId?.isNew && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded">
                                        NEW
                                    </span>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-2 ml-auto">
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="px-4 py-2 bg-[#306D29] text-white text-sm rounded-lg hover:bg-[#1f4a1f] transition flex items-center gap-1"
                                >
                                    <IoBagAddOutline /> Move to Cart
                                </button>
                                <button
                                    onClick={() => handleRemove(item._id, item.productId?.name)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist