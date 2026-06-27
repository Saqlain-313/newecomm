import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  FaSearch,
  FaHeart,
  FaStar,
  FaShoppingBag,
  FaArrowRight,
  FaCheck,
  FaFilter,
  FaTimes,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaTag,
  FaFire,
  FaCrown,
  FaGem,
  FaLeaf,
  FaPalette,
  FaStore
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [activeFilter, setActiveFilter] = useState('all');

  // Brand Categories
  const categories = [
    { id: 'all', label: 'All Brands', icon: FaStore },
    { id: 'luxury', label: 'Luxury', icon: FaCrown },
    { id: 'street', label: 'Streetwear', icon: FaFire },
    { id: 'sustainable', label: 'Sustainable', icon: FaLeaf },
    { id: 'premium', label: 'Premium', icon: FaGem },
    { id: 'artisan', label: 'Artisan', icon: FaPalette }
  ];

  // Brands Data
  const brands = useMemo(() => [
    {
      id: 1,
      name: 'ZARA',
      category: 'premium',
      logo: 'https://ui-avatars.com/api/?name=ZARA&background=1a1a2e&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      description: 'Leading fashion brand known for trendy and affordable clothing.',
      rating: 4.8,
      reviews: 12450,
      followers: 85000,
      products: 234,
      year: 1975,
      country: 'Spain',
      verified: true,
      sustainable: true,
      popular: true,
      instagram: '@zarafashion',
      website: 'www.zara.com',
      featured: true,
      colors: ['#1a1a2e', '#16213e', '#0f3460'],
      tags: ['Women', 'Men', 'Accessories'],
      benefits: ['Free Shipping', 'Easy Returns', '30-Day Exchange']
    },
    {
      id: 2,
      name: 'H&M',
      category: 'street',
      logo: 'https://ui-avatars.com/api/?name=H%26M&background=2d4059&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      description: 'Affordable fashion for everyone, with a focus on sustainability.',
      rating: 4.6,
      reviews: 10230,
      followers: 72000,
      products: 189,
      year: 1947,
      country: 'Sweden',
      verified: true,
      sustainable: true,
      popular: true,
      instagram: '@hmfashion',
      website: 'www.hm.com',
      featured: false,
      colors: ['#2d4059', '#3b4a6b', '#4a5b7e'],
      tags: ['Women', 'Men', 'Kids'],
      benefits: ['Free Delivery', 'Recycled Materials', 'Conscious Collection']
    },
    {
      id: 3,
      name: 'GUCCI',
      category: 'luxury',
      logo: 'https://ui-avatars.com/api/?name=GUCCI&background=1a1a2e&color=ffd700&size=128',
      cover: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800',
      description: 'Italian luxury brand of fashion and leather goods.',
      rating: 4.9,
      reviews: 8450,
      followers: 120000,
      products: 156,
      year: 1921,
      country: 'Italy',
      verified: true,
      sustainable: false,
      popular: true,
      instagram: '@gucciofficial',
      website: 'www.gucci.com',
      featured: true,
      colors: ['#1a1a2e', '#2d1b2e', '#3d1b2e'],
      tags: ['Luxury', 'Handbags', 'Footwear'],
      benefits: ['Luxury Packaging', 'Personal Shopper', 'VIP Access']
    },
    {
      id: 4,
      name: 'NIKE',
      category: 'street',
      logo: 'https://ui-avatars.com/api/?name=NIKE&background=black&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      description: 'Global leader in athletic footwear, apparel, and equipment.',
      rating: 4.7,
      reviews: 15600,
      followers: 95000,
      products: 312,
      year: 1964,
      country: 'USA',
      verified: true,
      sustainable: true,
      popular: true,
      instagram: '@nikeofficial',
      website: 'www.nike.com',
      featured: true,
      colors: ['#000000', '#1a1a1a', '#2d2d2d'],
      tags: ['Sportswear', 'Footwear', 'Athletic'],
      benefits: ['Durable Products', 'Innovation', 'Performance Guarantee']
    },
    {
      id: 5,
      name: 'ADIDAS',
      category: 'street',
      logo: 'https://ui-avatars.com/api/?name=ADIDAS&background=1a1a2e&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800',
      description: 'German multinational corporation designing and manufacturing shoes, clothing, and accessories.',
      rating: 4.6,
      reviews: 13400,
      followers: 88000,
      products: 278,
      year: 1949,
      country: 'Germany',
      verified: true,
      sustainable: true,
      popular: true,
      instagram: '@adidasofficial',
      website: 'www.adidas.com',
      featured: false,
      colors: ['#1a1a2e', '#16213e', '#2d2d2d'],
      tags: ['Sportswear', 'Footwear', 'Accessories'],
      benefits: ['Sustainable Materials', 'Innovation', 'Performance']
    },
    {
      id: 6,
      name: 'LOUIS VUITTON',
      category: 'luxury',
      logo: 'https://ui-avatars.com/api/?name=LV&background=1a1a2e&color=gold&size=128',
      cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      description: 'French luxury fashion house and company founded in 1854.',
      rating: 4.9,
      reviews: 7650,
      followers: 110000,
      products: 134,
      year: 1854,
      country: 'France',
      verified: true,
      sustainable: true,
      popular: true,
      instagram: '@louisvuitton',
      website: 'www.louisvuitton.com',
      featured: true,
      colors: ['#1a1a2e', '#2d1b2e', '#3d1b2e'],
      tags: ['Luxury', 'Handbags', 'Travel'],
      benefits: ['Premium Quality', 'Lifetime Warranty', 'Exclusive Designs']
    },
    {
      id: 7,
      name: 'SUPREME',
      category: 'street',
      logo: 'https://ui-avatars.com/api/?name=SUPREME&background=cc0000&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      description: 'American skateboarding shop and clothing brand established in 1994.',
      rating: 4.5,
      reviews: 9800,
      followers: 65000,
      products: 89,
      year: 1994,
      country: 'USA',
      verified: true,
      sustainable: false,
      popular: true,
      instagram: '@supremenewyork',
      website: 'www.supremenewyork.com',
      featured: false,
      colors: ['#cc0000', '#1a1a1a', '#ffffff'],
      tags: ['Streetwear', 'Skateboarding', 'Limited Edition'],
      benefits: ['Limited Releases', 'Collaborations', 'Exclusive Drops']
    },
    {
      id: 8,
      name: 'PRADA',
      category: 'luxury',
      logo: 'https://ui-avatars.com/api/?name=PRADA&background=1a1a2e&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      description: 'Italian luxury fashion house specializing in leather goods, accessories, footwear, and fragrances.',
      rating: 4.8,
      reviews: 6900,
      followers: 98000,
      products: 167,
      year: 1913,
      country: 'Italy',
      verified: true,
      sustainable: true,
      popular: false,
      instagram: '@pradaofficial',
      website: 'www.prada.com',
      featured: true,
      colors: ['#1a1a2e', '#16213e', '#0f3460'],
      tags: ['Luxury', 'Handbags', 'Footwear'],
      benefits: ['Premium Materials', 'Italian Craftsmanship', 'Classic Designs']
    },
    {
      id: 9,
      name: 'BALENCIAGA',
      category: 'luxury',
      logo: 'https://ui-avatars.com/api/?name=BALENCIAGA&background=black&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      description: 'Spanish luxury fashion house founded in 1917.',
      rating: 4.7,
      reviews: 7800,
      followers: 92000,
      products: 145,
      year: 1917,
      country: 'Spain',
      verified: true,
      sustainable: false,
      popular: false,
      instagram: '@balenciaga',
      website: 'www.balenciaga.com',
      featured: false,
      colors: ['#000000', '#1a1a1a', '#2d2d2d'],
      tags: ['Luxury', 'Footwear', 'Ready-to-Wear'],
      benefits: ['Innovative Designs', 'High Fashion', 'Statement Pieces']
    },
    {
      id: 10,
      name: 'STELLA McCARTNEY',
      category: 'sustainable',
      logo: 'https://ui-avatars.com/api/?name=STELLA&background=2d4059&color=fff&size=128',
      cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      description: 'Luxury fashion brand committed to sustainability and ethical practices.',
      rating: 4.4,
      reviews: 5600,
      followers: 58000,
      products: 98,
      year: 2001,
      country: 'UK',
      verified: true,
      sustainable: true,
      popular: false,
      instagram: '@stellamccartney',
      website: 'www.stellamccartney.com',
      featured: false,
      colors: ['#2d4059', '#3b4a6b', '#4a5b7e'],
      tags: ['Sustainable', 'Luxury', 'Eco-Friendly'],
      benefits: ['Vegan Materials', 'Sustainable Practices', 'Eco-Conscious']
    }
  ], []);

  // Filter and Search Logic
  const filteredBrands = useMemo(() => {
    let result = brands;

    // Search filter
    if (searchTerm) {
      result = result.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(brand => brand.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result = result.sort((a, b) => b.popular - a.popular);
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case 'followers':
        result = result.sort((a, b) => b.followers - a.followers);
        break;
      case 'name':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [brands, searchTerm, selectedCategory, sortBy]);

  // Featured Brands
  const featuredBrands = useMemo(() => {
    return brands.filter(brand => brand.featured);
  }, [brands]);

  // Brand Modal Handler
  const openBrandModal = useCallback((brand) => {
    setSelectedBrand(brand);
    setShowBrandModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBrandModal = useCallback(() => {
    setShowBrandModal(false);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() =>{
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF5DD] via-[#f5f0d6] to-[#E7E1B1] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaStore className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Our Brands
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Discover premium brands curated for your style. From luxury to sustainable fashion.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search brands..."
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3.5 border border-gray-200 rounded-xl hover:border-[#306D29] transition-all"
              >
                <FaFilter />
                <span>Filters</span>
                {selectedCategory !== 'all' && (
                  <span className="w-5 h-5 bg-[#306D29] text-white text-xs rounded-full flex items-center justify-center">
                    1
                  </span>
                )}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] bg-white"
              >
                <option value="popular">Popular</option>
                <option value="rating">Rating</option>
                <option value="followers">Followers</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-down">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        selectedCategory === category.id
                          ? 'bg-[#306D29] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{category.label}</span>
                      {selectedCategory === category.id && (
                        <FaCheck className="w-3 h-3" />
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-2 text-sm text-[#306D29] hover:underline flex items-center gap-1"
                >
                  <FaTimes className="w-3 h-3" /> Clear filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* Featured Brands */}
        {!searchTerm && selectedCategory === 'all' && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCrown className="text-yellow-500" />
              Featured Brands
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredBrands.slice(0, 3).map((brand) => (
                <div
                  key={brand.id}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => openBrandModal(brand)}
                >
                  <div className="relative h-48">
                    <img
                      src={brand.cover}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white">
                        <h3 className="text-xl font-bold">{brand.name}</h3>
                        {brand.verified && <MdVerified className="text-blue-400" />}
                      </div>
                      <p className="text-white/80 text-sm">{brand.description.substring(0, 60)}...</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                      {brand.category.charAt(0).toUpperCase() + brand.category.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
                onClick={() => openBrandModal(brand)}
              >
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Badges */}
                  {brand.popular && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      POPULAR
                    </div>
                  )}
                  {brand.sustainable && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FaLeaf className="w-3 h-3" /> ECO
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <h3 className="font-bold text-gray-800 text-sm">{brand.name}</h3>
                    {brand.verified && <MdVerified className="text-blue-400 text-sm" />}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                    <FaStar className="text-yellow-400" />
                    <span>{brand.rating}</span>
                    <span className="text-gray-300">•</span>
                    <span>{brand.products} products</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {brand.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No brands found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-[#306D29] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredBrands.length} of {brands.length} brands
        </div>
      </div>

      {/* Brand Modal */}
      {showBrandModal && selectedBrand && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="relative h-48 md:h-56">
              <img
                src={selectedBrand.cover}
                alt={selectedBrand.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <button
                onClick={closeBrandModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 flex items-center gap-4">
                <img
                  src={selectedBrand.logo}
                  alt={selectedBrand.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {selectedBrand.name}
                    </h2>
                    {selectedBrand.verified && <MdVerified className="text-blue-400 text-2xl" />}
                  </div>
                  <p className="text-white/90 text-sm">
                    {selectedBrand.country} • Est. {selectedBrand.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {selectedBrand.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#306D29]">{selectedBrand.products}</p>
                  <p className="text-xs text-gray-500">Products</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#306D29]">{selectedBrand.followers.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#306D29]">{selectedBrand.rating}★</p>
                  <p className="text-xs text-gray-500">{selectedBrand.reviews.toLocaleString()} reviews</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBrand.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {tag}
                  </span>
                ))}
                {selectedBrand.sustainable && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FaLeaf /> Sustainable
                  </span>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Why Shop Here</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedBrand.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheck className="text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Connect</h4>
                  <div className="flex gap-3">
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform">
                      <FaFacebook />
                    </button>
                    <button className="p-2 bg-sky-500 text-white rounded-full hover:scale-110 transition-transform">
                      <FaTwitter />
                    </button>
                    <button className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:scale-110 transition-transform">
                      <FaInstagram />
                    </button>
                    <button className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform">
                      <FaYoutube />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">{selectedBrand.instagram}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Contact</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaGlobe /> {selectedBrand.website}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaMapMarkerAlt /> {selectedBrand.country}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-[#306D29] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all">
                  Shop Now
                </button>
                <button className="flex-1 border-2 border-[#306D29] text-[#306D29] py-3.5 rounded-xl font-semibold hover:bg-[#306D29] hover:text-white transition-all">
                  Follow Brand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Brands;