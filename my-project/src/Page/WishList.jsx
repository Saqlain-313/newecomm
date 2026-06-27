import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist, getWishlist } from '../redux/wishlistSlice'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaHeart, FaTrash, FaShoppingBag, FaStar, FaStarHalfAlt,
  FaArrowLeft, FaRegHeart, FaShare, FaEye
} from 'react-icons/fa'
import { IoBagAddOutline } from 'react-icons/io5'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { addToCart } from '../redux/cartSlice'

const Wishlist = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedItems, setSelectedItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getWishlist())
    }, [dispatch])

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems)

    const handleRemoveFromWishlist = async (itemId, productName) => {
        setIsLoading(true)
        try {
            await dispatch(removeFromWishlist(itemId))
            showToast(`Removed "${productName}" from wishlist`, 'info')
        } catch (error) {
            showToast('Failed to remove item', 'error')
        } finally {
            setIsLoading(false)
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
        } catch (error) {
            showToast('Failed to add to cart', 'error')
        }
    }

    const handleMoveToCart = async (item) => {
        await handleAddToCart(item.productId)
        await handleRemoveFromWishlist(item._id, item.productId?.name)
    }

    const [toast, setToast] = useState(null)
    const showToast = (message, type = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const renderStars = (rating) => {
        const validRating = Math.max(0, Math.min(5, Number(rating) || 0))
        const fullStars = Math.floor(validRating)
        const hasHalfStar = validRating % 1 >= 0.5
        const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0))

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-400 text-xs" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-xs" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaStar key={`empty-${i}`} className="text-gray-300 text-xs" />
                ))}
            </>
        )
    }

    // Empty Wishlist Component
    const EmptyWishlist = () => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4"
        >
            <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                    <FaRegHeart className="text-6xl text-red-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xl">!</span>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-6">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mt-2 text-center max-w-md">
                Start adding your favorite items to the wishlist and they will appear here.
            </p>
            <Link to="/products">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                    <FaArrowLeft className="text-sm" />
                    Start Shopping
                </motion.button>
            </Link>
        </motion.div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-6 px-3 sm:px-4 lg:px-8">
            
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-6 right-6 z-50 max-w-sm w-full"
                    >
                        <div className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm flex items-center gap-3 ${
                            toast.type === 'success' ? 'bg-green-50 border-green-500 border-2' : 
                            toast.type === 'error' ? 'bg-red-50 border-red-500 border-2' :
                            'bg-blue-50 border-blue-500 border-2'
                        }`}>
                            <span className="text-2xl">
                                {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
                            </span>
                            <p className={`font-medium ${
                                toast.type === 'success' ? 'text-green-800' : 
                                toast.type === 'error' ? 'text-red-800' :
                                'text-blue-800'
                            }`}>
                                {toast.message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                    <Link to="/" className="hover:text-[#306D29] transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-700 font-medium">Wishlist</span>
                    {wishlistItems.length > 0 && (
                        <>
                            <span className="text-gray-300">/</span>
                            <span className="text-[#306D29] font-medium">{wishlistItems.length} items</span>
                        </>
                    )}
                </nav>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div >
                        <h1 className="text-3xl lg:text-4xl font-bold text-center ite text-gray-800 flex items-center gap-3">
                            <FaHeart className="text-red-500" />
                            My Wishlist
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {wishlistItems.length > 0 
                                ? `You have ${wishlistItems.length} items in your wishlist` 
                                : 'Your wishlist is empty'}
                        </p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <Link to="/">
                            <button className="px-6 py-3 bg-[#306D29] text-white rounded-xl hover:bg-[#255420] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                <FaArrowLeft className="text-sm" />
                                Continue Shopping
                            </button>
                        </Link>
                    )}
                </div>

                {/* Wishlist Items */}
                {wishlistItems.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Product Image */}
                                <div className="relative bg-gray-50 overflow-hidden">
                                    <img
                                        src={item.productId?.image || item.productId?.images?.[0]}
                                        alt={item.productId?.name}
                                        className="w-full h-56 object-center group-hover:scale-110 transition-transform duration-500"
                                    />
                                    
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                                        {item.productId?.discount > 0 && (
                                            <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full shadow-lg">
                                                {item.productId.discount}% OFF
                                            </span>
                                        )}
                                        {item.productId?.isNew && (
                                            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] font-bold rounded-full shadow-lg">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    {/* Quick Actions Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => handleAddToCart(item.productId)}
                                                className="flex-1 py-2 bg-white rounded-xl text-gray-700 font-semibold text-sm hover:bg-[#306D29] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <IoBagAddOutline className="text-lg" />
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => navigate(`/product/${item.productId?._id}`)}
                                                className="px-4 py-2 bg-white rounded-xl text-gray-700 hover:bg-[#306D29] hover:text-white transition-all duration-300 flex items-center justify-center"
                                            >
                                                <FaEye className="text-lg" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove Button on Image */}
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item._id, item.productId?.name)}
                                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white group"
                                    >
                                        <FaTrash className="text-gray-600 group-hover:text-white transition-colors" />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 text-md tracking-wider line-clamp-1 group-hover:text-[#306D29] transition-colors">
                                                {item.productId?.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-1 tracking-wider">
                                                {item.productId?.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center gap-0.5">
                                            {renderStars(item.productId?.rating || 4.5)}
                                        </div>
                                        <span className="text-[10px] text-gray-500">
                                            ({item.productId?.reviews || 50})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <span className="text-lg font-bold text-[#306D29]">
                                            ₹{item.productId?.price}
                                        </span>
                                        {item.productId?.oldPrice && (
                                            <span className="text-md text-gray-400 line-through">
                                                ₹{item.productId?.oldPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <button
                                            onClick={() => handleMoveToCart(item)}
                                            className="flex-1 py-2 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <IoBagAddOutline className="text-lg" />
                                            Move to Cart
                                        </button>
                                        {/* <button
                                            onClick={() => handleRemoveFromWishlist(item._id, item.productId?.name)}
                                            className="px-4 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                                        >
                                            <FaTrash className="text-sm" />
                                        </button> */}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Wishlist Stats */}
                {wishlistItems.length > 0 && (
                    <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[#306D29]">{wishlistItems.length}</p>
                                <p className="text-sm text-gray-500">Total Items</p>
                            </div>
                            <div className="text-center hidden lg:block">
                                <p className="text-3xl font-bold text-[#306D29] ">
                                    {wishlistItems.reduce((acc, item) => acc + (item.productId?.discount || 0), 0)}%
                                </p>
                                <p className="text-sm text-gray-500">Average Discount</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[#306D29]">
                                    ₹{wishlistItems.reduce((acc, item) => acc + (item.productId?.price || 0), 0)}
                                </p>
                                <p className="text-sm text-gray-500">Total Value</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[#306D29]">
                                    ₹{wishlistItems.reduce((acc, item) => acc + ((item.productId?.oldPrice || 0) - (item.productId?.price || 0)), 0)}
                                </p>
                                <p className="text-sm text-gray-500">Total Savings</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default Wishlist