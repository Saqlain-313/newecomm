import React, { useState, useEffect, useRef } from 'react'
import { IoBagAddOutline, IoSearchOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { SlUser } from "react-icons/sl";
import { PiSignIn } from "react-icons/pi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MobileNavbar from './MobileNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice'
import { getAllSubCategory } from '../redux/subCategorySlice'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const searchRef = useRef(null);

    const { categories } = useSelector((state) => state.category);
    const { user } = useSelector((state) => state.auth);
    const { subCategories } = useSelector((state) => state.subCategory);
    const cartItems = useSelector((state) => state.cart?.cartItems || []);
    const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllSubCategory());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Top Bar - Announcement */}
            <div className=" hidden lg:block bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white py-1">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <span className="animate-pulse">🔥</span>
                            Free Shipping on orders above ₹999
                        </span>
                        <span className="w-px h-4 bg-white/30"></span>
                        <span>New Collection Launching Soon</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="mailto:support@glamorous.com" className="hover:underline transition-all">
                            📧 care@glamorous.com
                        </a>
                        <span className="w-px h-4 bg-white/30"></span>
                        <span>📞 +91 98765 43210</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`sticky top-0 z-50 hidden lg:block transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-[#FBF5DD] shadow-sm'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-1.5">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 group">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#306D29] to-[#4CAF50] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-white font-bold text-xl">G</span>
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-gray-800 group-hover:text-[#306D29] transition-colors duration-300">
                                    GLAMOROUS
                                </span>
                            </div>
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-xl mx-8" ref={searchRef}>
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchOpen(true)}
                                    className="w-full h-10 pl-12 pr-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-full focus:border-[#306D29] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                                />
                                <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <button
                                    type="submit"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center gap-2">
                            {/* Wishlist */}
                            <Link to="/wishlist" className="relative p-2.5 rounded-full hover:bg-white/50 transition-all duration-300 group">
                                <FaRegHeart className="text-2xl group-hover:text-[#306D29] transition-colors" />
                                {wishlistItems?.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-white/50 transition-all duration-300 group">
                                <IoBagAddOutline className="text-2xl group-hover:text-[#306D29] transition-colors" />
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#306D29] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* User Profile */}
                            {user ? (
                                <Link to="/profilelayout" className="relative p-2.5 rounded-full hover:bg-white/50 transition-all duration-300 group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#306D29] to-[#4CAF50] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="hidden sm:flex items-center gap-2 px-4 py-1.5 border-2 border-[#306D29] text-[#306D29] rounded-full hover:bg-[#306D29] hover:text-white transition-all duration-300 font-medium text-sm">
                                        <PiSignIn className="text-lg" />
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium text-sm">
                                        <AiOutlineUserAdd className="text-lg" />
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Category Navigation */}
            <div className="hidden lg:block bg-[#306D29] shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <ul className="flex items-center gap-1 h-10">
                        {[...categories].reverse().map((category, index) => (
                            <li
                                key={category._id}
                                className="relative group h-full flex items-center"
                                onMouseEnter={() => setHoveredCategory(category._id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <Link
                                    to={`/products/category/${category._id}`}
                                    className="px-4 py-3 text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center gap-1"
                                >
                                    {category.name}
                                    <MdKeyboardArrowDown className={`text-base transition-transform duration-300 ${hoveredCategory === category._id ? 'rotate-180' : ''
                                        }`} />
                                </Link>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {hoveredCategory === category._id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute left-0 top-full pt-2 z-50"
                                        >
                                            <div className="bg-white rounded-2xl shadow-2xl min-w-[280px] overflow-hidden border border-gray-100">
                                                <div className="p-2">
                                                    <div className="px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-1">
                                                        <span className="text-xs font-semibold text-[#306D29]">
                                                            {category.name} Categories
                                                        </span>
                                                    </div>
                                                    {subCategories
                                                        ?.filter((sub) => sub.categoryId?._id === category._id)
                                                        .map((sub) => (
                                                            <Link
                                                                key={sub._id}
                                                                to={`/products/subcategory/${sub._id}`}
                                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#306D29] rounded-xl transition-all duration-200"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span>{sub.name}</span>
                                                                    <span className="text-[10px] text-gray-400">→</span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    {subCategories?.filter((sub) => sub.categoryId?._id === category._id)
                                                        .length === 0 && (
                                                            <div className="px-4 py-3 text-sm text-gray-400">
                                                                No subcategories available
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}

                        {/* Sale Badge */}
                        <li className="ml-auto">
                            <span className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                                🔥 SALE
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Navbar */}
            <MobileNavbar />
        </>
    )
}

export default Navbar