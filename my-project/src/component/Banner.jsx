import React, { useState, useCallback } from 'react';
import { FiArrowRight, FiShoppingBag, FiHeart } from 'react-icons/fi';
import image1 from '../assets/images/brand1.jpg';
import image2 from '../assets/images/brand2.jpg';

const Banner = () => {
  const [hoveredBanner, setHoveredBanner] = useState(null);
  const [isLiked, setIsLiked] = useState({});

  const banners = [
    {
      id: 1,
      image: image1,
      title: 'Summer Collection',
      subtitle: 'Light & Breezy Styles',
      discount: 'Up to 40% Off',
      brand: 'ZARA',
      color: 'from-yellow-400 to-orange-500',
      buttonColor: 'bg-gradient-to-r from-[#d5c865] to-[#c4b855]'
    },
    {
      id: 2,
      image: image2,
      title: 'Premium Essentials',
      subtitle: 'Timeless Fashion Pieces',
      discount: 'New Arrivals',
      brand: 'H&M',
      color: 'from-blue-400 to-purple-500',
      buttonColor: 'bg-gradient-to-r from-[#d5c865] to-[#c4b855]'
    }
  ];

  const handleLike = useCallback((id, e) => {
    e.stopPropagation();
    setIsLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#FBF5DD] to-[#f5f0d6] py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-4 mb-8 md:mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0D530E] to-transparent"></div>
          <div className="relative group">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0D530E] tracking-wider relative">
              BRAND
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#0D530E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </h1>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-[#0D530E] via-[#0D530E] to-transparent"></div>
        </div>

        {/* Brand Description */}
        <p className="text-center text-gray-600 text-sm md:text-base mb-8 max-w-2xl mx-auto">
          Discover our curated selection of premium brands, crafted for the modern lifestyle
        </p>

        {/* Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              onMouseEnter={() => setHoveredBanner(banner.id)}
              onMouseLeave={() => setHoveredBanner(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px]">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Brand Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-xs font-bold text-gray-800">{banner.brand}</span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(banner.id, e)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <FiHeart 
                    className={`w-5 h-5 transition-colors ${
                      isLiked[banner.id] ? 'text-red-500 fill-red-500' : 'text-gray-700'
                    }`}
                  />
                </button>

                {/* Discount Badge */}
                <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${banner.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-20px] group-hover:translate-y-0`}>
                  {banner.discount}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                  <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-white/90 text-sm md:text-base mb-4">
                      {banner.subtitle}
                    </p>

                    {/* Shop Now Button */}
                    <button className="group/btn inline-flex items-center gap-2 bg-[#d5c865] hover:bg-[#c4b855] text-gray-800 font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <FiShoppingBag className="w-4 h-4" />
                      <span>Shop Now</span>
                      <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d5c865] rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/70 transition-all duration-300 hover:shadow-lg">
            <p className="text-2xl md:text-3xl font-bold text-[#0D530E]">50+</p>
            <p className="text-xs md:text-sm text-gray-600">Brands Available</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/70 transition-all duration-300 hover:shadow-lg">
            <p className="text-2xl md:text-3xl font-bold text-[#0D530E]">2000+</p>
            <p className="text-xs md:text-sm text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/70 transition-all duration-300 hover:shadow-lg">
            <p className="text-2xl md:text-3xl font-bold text-[#0D530E]">4.8★</p>
            <p className="text-xs md:text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/70 transition-all duration-300 hover:shadow-lg">
            <p className="text-2xl md:text-3xl font-bold text-[#0D530E]">100%</p>
            <p className="text-xs md:text-sm text-gray-600">Authentic Products</p>
          </div>
        </div>

        {/* Brand Partners */}
        <div className="mt-2 md:mt-12 pt-6 md:pt-3 border-t border-gray-200/50">
          <p className="text-center text-xs md:text-sm text-gray-500 mb-4">Trusted by leading brands</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
            <span className="text-sm md:text-base font-semibold text-gray-700">ZARA</span>
            <span className="text-sm md:text-base font-semibold text-gray-700">H&M</span>
            <span className="text-sm md:text-base font-semibold text-gray-700">MANGO</span>
            <span className="text-sm md:text-base font-semibold text-gray-700">GUCCI</span>
            <span className="text-sm md:text-base font-semibold text-gray-700">PRADA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;