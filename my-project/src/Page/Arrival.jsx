import React, { useState, useRef, useEffect } from 'react';
import { SliderImage } from '../store/SliderImage';
import { FaRegHeart, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { BsBag } from "react-icons/bs";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Arrival = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  const totalSlides = Math.ceil(SliderImage.length / itemsPerView.desktop);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [currentIndex, isAutoPlay]);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalSlides - 1);
    }
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Star rating component
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-[10px]" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-[10px]" />);
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-b from-[#FBF5DD] to-[#f5efd0] py-4 lg:py-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl translate-x-32 translate-y-32" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full mb-2">
              New Collection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              New Arrivals
            </h2>
            {/* <p className="text-gray-500 mt-0.5 text-xs sm:text-sm">
              Discover our latest collection
            </p> */}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {isAutoPlay ? '⏸ Pause' : '▶ Play'}
            </button>
            <Link
              to="/new-arrivals"
              className="group flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View All
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-10 bg-black' 
                  : 'w-5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl  rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <IoChevronBackOutline size={18} className="text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl p-2.5 rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <IoChevronForwardOutline size={18} className="text-gray-700" />
        </button>

        {/* Slider */}
        <div className="overflow-hidden rounded-xl">
          <motion.div
            className="flex transition-all duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {SliderImage.map((item, index) => (
              <motion.div
                key={item.id}
                className="min-w-full sm:min-w-[30%] lg:min-w-[25%] px-2 sm:px-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Image Container - SMALLER */}
                  <div className="relative overflow-hidden bg-gray-100 aspect-[2/2]">
                    <img
                      src={item.Image}
                      alt={item.description}
                      className="w-full h-full object-center transition-all duration-700 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badges - SMALLER */}
                    {item.isNew && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                        NEW
                      </div>
                    )}
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                        -{item.discount}%
                      </div>
                    )}

                    {/* Action Buttons - SMALLER */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleWishlist(item.id)}
                        className={`bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl ${
                          wishlist.includes(item.id) 
                            ? 'text-red-500' 
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        {wishlist.includes(item.id) ? (
                          <FaHeart className="text-xs sm:text-sm" />
                        ) : (
                          <FaRegHeart className="text-xs sm:text-sm" />
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg text-gray-600 hover:text-blue-600 transition-colors duration-300"
                      >
                        <FiEye className="text-xs sm:text-sm" />
                      </motion.button>
                    </div>

                    {/* Quick Add Button - SMALLER */}
                    <motion.button
                      initial={{ y: '100%' }}
                      animate={{ 
                        y: hoveredItem === item.id ? '0%' : '100%'
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0D530E] to-[#1a7a1a] text-white py-2.5 sm:py-3 font-semibold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 hover:shadow-lg transition-all duration-300"
                    >
                      <BsBag className="text-sm sm:text-base" />
                      Quick Add
                    </motion.button>
                  </div>

                  {/* Content - SMALLER */}
                  <div className="p-2.5 sm:p-3 space-y-1.5">
                    {/* Rating - SMALLER */}
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating || 4.5)}
                      <span className="text-[8px] sm:text-[10px] text-gray-400 ml-0.5">
                        ({item.reviews || 24})
                      </span>
                    </div>

                    {/* Description with Line Clamp - SMALLER */}
                    <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors duration-200 line-clamp-1">
                      {item.description}
                    </h3>

                    {/* Price with ₹ Symbol - SMALLER */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                        ₹ {item.price.replace('$', '').trim()}
                      </span>
                      {item.oldPrice && (
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                          ₹ {item.oldPrice.replace('$', '').trim()}
                        </span>
                      )}
                    </div>

                    {/* Size Options - SMALLER */}
                    {item.sizes && (
                      <div className="flex items-center gap-0.5 mt-0.5 flex-wrap">
                        {item.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="text-[8px] sm:text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {size}
                          </span>
                        ))}
                        {item.sizes.length > 4 && (
                          <span className="text-[8px] sm:text-[10px] text-gray-400">+{item.sizes.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Color Options - SMALLER */}
                    {item.colors && (
                      <div className="flex items-center gap-1 mt-0.5">
                        {item.colors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-7 bg-black' 
                  : 'w-3.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arrival;