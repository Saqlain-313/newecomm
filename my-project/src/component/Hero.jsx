import React, { useState } from 'react';
import image1 from '../assets/images/heroimg.jpg';
import image2 from '../assets/images/heroimg1.jpg';

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <header className="relative w-full" role="banner" aria-label="Hero banner">
      {/* Hero Image - Clean design with loading states */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Loading skeleton with shimmer effect */}
        {!isImageLoaded && (
          <div className="absolute inset-0">
            <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        )}
        
        {/* Responsive Image */}
        <picture>
          <source 
            media="(min-width: 1024px)" 
            srcSet={`${image1} 1x, ${image1} 2x`}
            type="image/jpeg"
          />
          <source 
            media="(min-width: 768px)" 
            srcSet={`${image2} 1x, ${image2} 2x`}
            type="image/jpeg"
          />
          <source 
            media="(max-width: 767px)" 
            srcSet={`${image2} 1x, ${image2} 2x`}
            type="image/jpeg"
          />
          <img
            src={image1}
            alt="Glamorous - New Collection Summer 2026"
            className={`w-full h-[450px] xs:h-[400px] sm:h-[500px] md:h-[550px] lg:h-[500px] object-cover transition-all duration-1000 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1440"
            height="600"
          />
        </picture>
        
        {/* Gradient Overlay for better visual appeal */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
          
          {/* Bottom gradient for text readability if needed */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Decorative glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Minimal Brand Overlay - Top Left */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              G
            </span>
            <span className="text-xs sm:text-sm font-light text-white/80 tracking-wider uppercase drop-shadow">
              GLAMOROUS
            </span>
          </div>
        </div>

        {/* Subtle text overlay - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 sm:bottom-12 pointer-events-none z-10">
          <div className="text-center">
            <p className="text-white/90 text-xs sm:text-sm font-medium tracking-wider uppercase drop-shadow-lg">
              New Collection
            </p>
            <p className="text-white text-lg sm:text-2xl font-bold drop-shadow-lg">
              Summer 2026
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility: Skip to content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded-md shadow-lg z-50 focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>
    </header>
  );
};

export default Hero;