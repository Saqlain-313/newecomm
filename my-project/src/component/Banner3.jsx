import React, { useState, useMemo, useCallback } from 'react';
import image1 from '../assets/images/banner55/banner.jpg';
import image2 from '../assets/images/discount.jpg';
import image3 from '../assets/images/discount1.jpg';
import image4 from '../assets/images/discount2.jpg';
import image5 from '../assets/images/discount3.jpg';
import image6 from '../assets/images/discount4.jpg';

const Banner3 = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const bannerImages = useMemo(() => [
    {
      id: 1,
      image: image2,
      discount: '50% OFF',
      title: 'Stylish Jeans',
      subtitle: 'Premium Denim Collection',
      color: 'from-purple-500 to-pink-500',
      badge: 'Bestseller'
    },
    {
      id: 2,
      image: image3,
      discount: '30% OFF',
      title: 'Summer Collection',
      subtitle: 'Light & Breezy Styles',
      color: 'from-blue-500 to-cyan-500',
      badge: 'New'
    },
    {
      id: 3,
      image: image4,
      discount: '25% OFF',
      title: 'New Arrival',
      subtitle: 'Fresh From The Runway',
      color: 'from-green-500 to-emerald-500',
      badge: 'Trending'
    },
    {
      id: 4,
      image: image5,
      discount: '40% OFF',
      title: 'Trending Fashion',
      subtitle: 'What\'s Hot Right Now',
      color: 'from-orange-500 to-red-500',
      badge: 'Popular'
    },
    {
      id: 5,
      image: image6,
      discount: '60% OFF',
      title: 'Limited Offer',
      subtitle: 'Hurry, While Stocks Last!',
      color: 'from-red-500 to-rose-600',
      badge: 'Limited'
    }
  ], []);

  const handleImageError = useCallback((id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  }, []);

  const getDiscountColor = useCallback((discount) => {
    const percentage = parseInt(discount);
    if (percentage >= 50) return 'text-red-600';
    if (percentage >= 40) return 'text-orange-600';
    if (percentage >= 30) return 'text-yellow-600';
    return 'text-green-600';
  }, []);

  return (
    <section className="bg-[#FBF5DD] py-8 lg:py-12 px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Banner */}
        <div className="relative group mb-6 lg:mb-8 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <img
            src={image1}
            alt="Main banner - Shop our latest collection"
            className="w-full lg:h-[500px] h-[300px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Main Banner Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
            <div className="text-white px-6 sm:px-10 lg:px-16 max-w-2xl">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mb-4">
                ✨ New Collection
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Summer Sale
                <span className="block text-yellow-400">Up to 70% Off</span>
              </h1>
              <p className="text-sm sm:text-base opacity-90 mb-6">
                Discover the latest trends and upgrade your wardrobe
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2">
                Shop Now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Corner Decoration */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-lg">
            Limited Time
          </div>
        </div>

        {/* Small Banner Images */}
        <div className="bg-gradient-to-br from-[#E7E1B1] to-[#ddd7a8] p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
              Exclusive Offers
            </h2>
            <button className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 flex items-center gap-1">
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {bannerImages.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-center transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  <div className={`absolute top-3 left-3 bg-gradient-to-r ${item.color} text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300`}>
                    {item.discount}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    {item.badge}
                  </div>

                  {/* Quick View Button */}
                  <button className="absolute inset-0 m-auto bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 w-fit h-fit shadow-lg">
                    Quick View
                  </button>

                  {/* Color Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 text-center space-y-1 sm:space-y-2 bg-white">
                  <h3 className={`text-base sm:text-lg font-bold ${getDiscountColor(item.discount)} transition-colors duration-300`}>
                    {item.discount}
                  </h3>
                  
                  <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </p>
                  
                  <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">
                    {item.subtitle}
                  </p>

                  {/* Add to Cart Button */}
                  <button className="w-full mt-2 bg-gradient-to-r from-[#0D530E] to-[#1a7a1b] text-white text-xs sm:text-sm py-1.5 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 hover:shadow-lg hover:brightness-110 transform group-hover:translate-y-0 translate-y-2">
                    Add to Cart
                  </button>
                </div>

                {/* Animated Border on Hover */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-xl transition-all duration-500 pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* Bottom Decorative Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-gray-300"></span>
              Don't miss out on these amazing deals!
              <span className="w-8 h-px bg-gray-300"></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner3;