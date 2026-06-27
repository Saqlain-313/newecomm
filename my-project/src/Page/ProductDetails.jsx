import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaShare,
    FaTruck, FaUndo, FaShieldAlt, FaCheckCircle, FaMinus, FaPlus,
    FaFacebook, FaTwitter, FaPinterest, FaWhatsapp, FaRupeeSign
} from "react-icons/fa";
import {
    IoBagAddOutline, IoBagCheckOutline, IoShareSocialOutline,
    IoShieldCheckmarkOutline, IoReturnUpBackOutline, IoTimeOutline
} from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
    BsTruck, BsShieldCheck, BsArrowLeft, BsArrowRight,
    BsCheckCircleFill
} from "react-icons/bs";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode, EffectFade } from "swiper/modules";
import { addToCart } from '../redux/cartSlice'
import { addToWishlist, getWishlist, removeFromWishlist } from '../redux/wishlistSlice'
import { getSingleProduct, getAllProduct } from '../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [mainImage, setMainImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const { product, products, loading, error } = useSelector((state) => state.product);
    const { wishlistItems = [] } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getWishlist());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSingleProduct(id));
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setMainImage(product.images[0]);
        }
        if (product?._id && wishlistItems) {
            const exists = wishlistItems.some(item => item.productId?._id === product._id);
            setIsWishlisted(exists);
        }
    }, [product, wishlistItems]);

    const handleWishlist = () => {
        if (!product?._id) return;
        if (isWishlisted) {
            const wishlistItem = wishlistItems.find(item => item.productId?._id === product._id);
            if (wishlistItem) {
                dispatch(removeFromWishlist(wishlistItem._id));
                setIsWishlisted(false);
            }
        } else {
            dispatch(addToWishlist({ productId: product._id }));
            setIsWishlisted(true);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedSize) {
            showToast("Please select a size", "error");
            return;
        }
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity: quantity,
                size: selectedSize,
            })).unwrap();
            setIsAddedToCart(true);
            showToast("Added to cart successfully!", "success");
            setTimeout(() => navigate('/cart'), 1500);
        } catch (error) {
            showToast("Failed to add to cart", "error");
        }
    };

    const [toast, setToast] = useState(null);
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const renderStars = (rating) => {
        const validRating = Math.max(0, Math.min(5, Number(rating) || 0));
        const fullStars = Math.floor(validRating);
        const hasHalfStar = validRating % 1 >= 0.5;
        const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />
                ))}
            </>
        );
    };

    const relatedProducts = products?.filter(
        (item) => item.category?._id === product?.category?._id && item._id !== product?._id
    ).slice(0, 12) || [];

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-[#306D29] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className=" flex flex-col justify-center items-center bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1]">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-700">Product Not Found</h2>
                <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/')} className="mt-6 px-6 py-3 bg-[#306D29] text-white rounded-xl hover:bg-[#255420] transition-all duration-300">
                    Back to Shopping
                </button>
            </div>
        );
    }

    return (
        <div className=" bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-6 px-3 sm:px-4 lg:px-8">

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-6 right-6 z-50 max-w-sm w-full"
                    >
                        <div className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm flex items-center gap-3 ${toast.type === 'success' ? 'bg-green-50 border-green-500 border-2' : 'bg-red-50 border-red-500 border-2'
                            }`}>
                            <span className="text-2xl">{toast.type === 'success' ? '✅' : '❌'}</span>
                            <p className={`font-medium ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                {toast.message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">

                {/* Main Product Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">

                        {/* ============ LEFT COLUMN - IMAGE GALLERY ============ */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 lg:p-4">
                            <div className="relative">
                                {/* Main Image Slider - Auto Play */}
                                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                                    <Swiper
                                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                                        effect="fade"
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true,
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        loop={true}
                                        className="h-[300px] lg:h-[550px]"
                                    >
                                        {product?.images?.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="w-full h-full flex items-center justify-center  bg-white ">
                                                    <img
                                                        src={img}
                                                        alt={`${product.name} - ${index + 1}`}
                                                        className="w-full h-full object-center rounded-md"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Buttons */}
                                    <button className="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <BsArrowLeft className="text-gray-700" />
                                    </button>
                                    <button className="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <BsArrowRight className="text-gray-700" />
                                    </button>

                                    {/* Badges */}
                                    <div className="absolute lg:top-4 lg:left-6 top-4 left-4 flex flex-col gap-2 z-10">
                                        {product.discount > 0 && (
                                            <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                                                {product.discount}% OFF
                                            </span>
                                        )}
                                        {product.isNew && (
                                            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    {/* Wishlist Button */}
                                    <button
                                        onClick={handleWishlist}
                                        className="absolute top-4 right-4 z-10 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                                    >
                                        {isWishlisted ? (
                                            <FaHeart className="text-red-500 text-xl" />
                                        ) : (
                                            <FaRegHeart className="text-gray-700 text-xl" />
                                        )}
                                    </button>
                                </div>

                                {/* Thumbnail Navigation */}
                                <div className="mt-4">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Thumbs]}
                                        className="h-20"
                                    >
                                        {product?.images?.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="h-full rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#306D29] transition-all duration-300 bg-white shadow-sm">
                                                    <img
                                                        src={img}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        {/* ============ RIGHT COLUMN - PRODUCT INFO ============ */}
                        <div className="p-2 lg:p-10 space-y-2 bg-white">

                            {/* Product Name & Rating */}
                            <div className="space-y-2">
                                <h1 className="text-lg lg:text-2xl font-bold text-gray-800 line-clamp-2 leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex items-center flex-wrap gap-3">
                                    <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                                        <span className="text-sm font-semibold text-green-700">{product.rating || 4.5}</span>
                                        <div className="flex items-center gap-0.5">
                                            {renderStars(product.rating || 4.5)}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">({product.reviews || 128} reviews)</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                        <BsCheckCircleFill className="text-xs" />
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Price Section */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-2 border border-green-100">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-4xl font-bold text-[#306D29] flex items-center">
                                        <FaRupeeSign className="text-2xl mr-1" />
                                        {product.price}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-gray-400 line-through flex items-center">
                                            <FaRupeeSign className="text-sm" />
                                            {product.oldPrice}
                                        </span>
                                    )}
                                    {product.discount > 0 && (
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            Save ₹{product.oldPrice - product.price}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-700">Select Size</h3>
                                    <button className="text-sm text-[#306D29] hover:underline font-medium">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product?.sizes?.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
                                                relative min-w-[48px] h-12 px-4 rounded-xl border-2 font-semibold text-sm
                                                flex items-center justify-center
                                                transition-all duration-300
                                                ${selectedSize === size
                                                    ? "bg-[#306D29] text-white border-[#306D29] shadow-lg transform scale-105"
                                                    : "bg-white border-gray-200 hover:border-[#306D29] hover:text-[#306D29]"
                                                }
                                            `}
                                        >
                                            {size}
                                            {selectedSize === size && (
                                                <FaCheckCircle className="absolute -top-2 -right-2 text-white bg-[#306D29] rounded-full text-xs" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-700">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg font-semibold"
                                        >
                                            <FaMinus className="text-sm" />
                                        </button>
                                        <span className="px-8 py-3 border-x border-gray-200 font-semibold min-w-[50px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg font-semibold"
                                        >
                                            <FaPlus className="text-sm" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">Available: {product.stock || 50} items</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg"
                                >
                                    <IoBagAddOutline className="text-2xl" />
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleWishlist}
                                    className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3 font-semibold ${isWishlisted
                                        ? "bg-red-50 border-red-500 text-red-500"
                                        : "bg-white border-gray-200 hover:border-[#306D29] hover:text-[#306D29]"
                                        }`}
                                >
                                    {isWishlisted ? (
                                        <>
                                            <FaHeart className="text-red-500 text-xl" />
                                            Wishlisted
                                        </>
                                    ) : (
                                        <>
                                            <FaRegHeart className="text-xl" />
                                            Wishlist
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {/* Delivery & Returns */}
                            {/* Delivery & Returns - Dynamic from backend */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 rounded-2xl p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#306D29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CiDeliveryTruck className="text-xl text-[#306D29]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">Free Delivery</p>
                                        <p className="text-xs text-gray-500">{product.delivery || "3-5 business days"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#306D29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <IoReturnUpBackOutline className="text-xl text-[#306D29]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">Easy Returns</p>
                                        <p className="text-xs text-gray-500">{product.replacement || "30 days return policy"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#306D29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <IoShieldCheckmarkOutline className="text-xl text-[#306D29]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">Secure Payment</p>
                                        <p className="text-xs text-gray-500">{product.payment || "100% secure"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Share Button */}
                            <button
                                onClick={() => setShowShare(true)}
                                className="flex items-center gap-2 text-gray-500 hover:text-[#306D29] transition-colors text-sm"
                            >
                                <IoShareSocialOutline className="text-lg" />
                                Share this product
                            </button>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="border-t border-gray-100 p-6 lg:p-8 bg-gray-50">
                        <div className="flex gap-8 border-b border-gray-200">
                            {['description', 'specifications', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-sm font-semibold capitalize transition-all duration-300 relative ${activeTab === tab
                                        ? 'text-[#306D29]'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.span
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-[#306D29] rounded-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="pt-6">
                            {activeTab === 'description' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-gray-600 leading-relaxed max-w-3xl">
                                        {product.FullDescription || "Experience the perfect blend of comfort, durability, and modern fashion with our premium collection. Designed using high-quality materials, these products provide exceptional support for daily use. Stylish, lightweight, and versatile, they enhance every outfit while ensuring all-day comfort and long-lasting performance."}
                                    </p>
                                </motion.div>
                            )}
                            {activeTab === 'specifications' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-3xl"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500">Brand</span>
                                            <span className="font-medium">{product.brand || "Premium"}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500">Category</span>
                                            <span className="font-medium">{product.category?.name || "General"}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500">SKU</span>
                                            <span className="font-medium">{product.sku || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500">Material</span>
                                            <span className="font-medium">Premium Quality</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500">Warranty</span>
                                            <span className="font-medium">1 Year</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-500">Availability</span>
                                            <span className="font-medium text-green-600">In Stock</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === 'reviews' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-3xl"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
                                        <div className="text-center">
                                            <span className="text-5xl font-bold text-gray-800">{product.rating || 4.5}</span>
                                            <div className="flex items-center gap-1 mt-2 justify-center">
                                                {renderStars(product.rating || 4.5)}
                                            </div>
                                            <span className="text-sm text-gray-500">{product.reviews || 128} reviews</span>
                                        </div>
                                        <div className="flex-1 w-full space-y-2">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-600 w-6">{star}</span>
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                                            style={{ width: `${Math.random() * 60 + 20}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-400 w-12">{Math.floor(Math.random() * 100)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Share Modal */}
                <AnimatePresence>
                    {showShare && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={() => setShowShare(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Share this product</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                        <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-2xl">
                                            <FaFacebook />
                                        </div>
                                        <span className="text-xs text-gray-600">Facebook</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                        <div className="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white text-2xl">
                                            <FaTwitter />
                                        </div>
                                        <span className="text-xs text-gray-600">Twitter</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                        <div className="w-12 h-12 bg-[#E60023] rounded-full flex items-center justify-center text-white text-2xl">
                                            <FaPinterest />
                                        </div>
                                        <span className="text-xs text-gray-600">Pinterest</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl">
                                            <FaWhatsapp />
                                        </div>
                                        <span className="text-xs text-gray-600">WhatsApp</span>
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowShare(false)}
                                    className="w-full mt-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                You Might Also Like
                            </h2>
                            <button
                                onClick={() => navigate('/')}
                                className="text-[#306D29] font-medium hover:underline flex items-center gap-2"
                            >
                                View All →
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {relatedProducts.map((item) => (
                                <motion.div
                                    key={item._id}
                                    whileHover={{ y: -8 }}
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                >
                                    <div className="relative bg-gray-50  overflow-hidden">
                                        <img
                                            src={item.images?.[0]}
                                            alt={item.name}
                                            className="w-full h-48 object-center group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {item.discount > 0 && (
                                            <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                                                -{item.discount}%
                                            </span>
                                        )}
                                        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                            <FaRegHeart className="text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="p-3 space-y-1.5">
                                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-bold text-[#306D29]">
                                                ₹{item.price}
                                            </span>
                                            {item.oldPrice && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    ₹{item.oldPrice}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center gap-0.5">
                                                {renderStars(item.rating || 4)}
                                            </div>
                                            <span className="text-[10px] text-gray-500">({item.reviews || 0})</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;