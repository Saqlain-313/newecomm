import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ProductImageSlider = ({ product, navigate, isHovered = false }) => {
  const swiperRef = useRef(null);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onMouseEnter={() => {
        swiperRef.current?.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current?.slideTo(0);
        swiperRef.current?.autoplay.stop();
      }}
    >
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.stop();
        }}
        className="w-full h-full"
      >
        {/* Main Image */}
        <SwiperSlide className="w-full h-full">
          <div className="w-full h-full overflow-hidden bg-gray-100 relative">
            <img
              src={product.image}
              alt={product.name}
              onClick={() => navigate(`/product/${product._id}`)}
              className={`w-full h-full  object-center cursor-pointer transition-all duration-700 ease-out ${
                isHovered ? 'scale-125' : 'scale-100'
              }`}
              style={{
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
        </SwiperSlide>

        {/* Other Images */}
        {product.images?.map((img, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="w-full h-full overflow-hidden bg-gray-100 relative">
              <img
                src={img}
                alt={product.name}
                onClick={() => navigate(`/product/${product._id}`)}
                className={`w-full h-full  object-center cursor-pointer transition-all duration-700 ease-out ${
                  isHovered ? 'scale-125' : 'scale-100'
                }`}
                style={{
                  transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;