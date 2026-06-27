import React, { useState } from 'react'
import { FashionBanner } from '../store/FashionBanner'
import { FaStar } from "react-icons/fa6";
import { VscVerifiedFilled } from "react-icons/vsc";
import { motion } from 'framer-motion';
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Banner1 = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Star rating component - Fixed without FaStarHalfAlt
  const renderStars = (rating = 5) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
    }
    // If rating has decimal, add a half star using a different approach
    if (rating % 1 !== 0) {
      // Use a regular star with half opacity or gradient
      stars.push(
        <div key="half" className="relative inline-block">
          <FaStar className="text-yellow-400 text-sm opacity-30" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <FaStar className="text-yellow-400 text-sm" />
          </div>
        </div>
      );
    }
    return stars;
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Clare",
      product: "Silver Barely There Strappy Heels",
      review: "Absolutely stunning! Great value for money, too!",
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      name: "Sarah",
      product: "Gold Chain Statement Necklace",
      review: "Perfect accessory for any occasion. Love the quality!",
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      name: "Emma",
      product: "Black Leather Crossbody Bag",
      review: "Stylish and practical. Best purchase this year!",
      rating: 4.5,
      verified: true,
    }
  ];

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

  return (
    <div className="bg-gradient-to-b from-[#E7E1B1] to-[#f5efd0] py-8 sm:py-12 lg:py-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-2 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3">
            Social Feed
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 flex flex-wrap items-center justify-center gap-2">
            FROM FEED, TO FIT
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              #BeGlamorous
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
            Discover how our community styles their favorite pieces
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2 md:gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {FashionBanner.map((item, index) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-square overflow-hidden bg-gray-200">
                <img
                  src={item.Image}
                  alt={`Fashion ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Instagram Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7.462c-2.506 0-4.538 2.032-4.538 4.538S9.494 16.538 12 16.538s4.538-2.032 4.538-4.538S14.506 7.462 12 7.462zm0 7.692c-1.742 0-3.154-1.412-3.154-3.154s1.412-3.154 3.154-3.154 3.154 1.412 3.154 3.154-1.412 3.154-3.154 3.154zm6.154-8.385a1.385 1.385 0 11-2.77 0 1.385 1.385 0 012.77 0z"/>
                    </svg>
                  </div>
                </div>

                {/* Instagram Badge */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-[10px] font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    @ukglamorous
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Handle */}
        <motion.div 
          className="flex justify-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="https://instagram.com/ukglamorous"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            <span className="text-sm font-medium relative">
              @ukglamorous
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-green-600 to-emerald-600 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </span>
            <IoArrowForward className="text-sm transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          className="mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full mb-2">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Hear from Our Beautiful Customers
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-[#FBF5DD] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="text-xs text-gray-400 ml-1">
                    ({testimonial.rating})
                  </span>
                </div>

                {/* Review */}
                <p className="text-gray-800 font-medium text-base leading-relaxed mb-4">
                  "{testimonial.review}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center text-green-700 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-gray-800 text-sm">
                        {testimonial.name}
                      </p>
                      {testimonial.verified && (
                        <VscVerifiedFilled className="text-green-500 text-xs" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {testimonial.product}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Reviews Button */}
          <div className="flex justify-center mt-8">
            <Link 
            //   to="/reviews"
              className="group inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Read All Reviews
              <IoArrowForward className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-yellow-200/30 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl -z-10" />
      </div>
    </div>
  )
}

export default Banner1