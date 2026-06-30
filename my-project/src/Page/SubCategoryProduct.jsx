import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySubCategory } from "../redux/productSlice";
import { 
  FaHeart, 
  FaRegHeart, 
  FaStar, 
  FaStarHalfAlt, 
  FaShoppingBag, 
  FaEye,
  FaFilter, 
  FaThLarge, 
  FaThList,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import ProductImageSlider from "../component/ProductImageSlider";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

const SubCategoryProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSize, setSelectedSize] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    selectedBrands: [],
    selectedSizes: [],
    selectedRating: null,
    inStock: false,
    onSale: false
  });

  const { products = [], loading } = useSelector((state) => state.product);
  const { wishlistItems = [] } = useSelector((state) => state.wishlist);

  // Get unique brands from products
  const availableBrands = useMemo(() => {
    const brands = new Set();
    products.forEach(product => {
      if (product.brand) brands.add(product.brand);
    });
    return Array.from(brands);
  }, [products]);

  // Get unique sizes from products
  const availableSizes = useMemo(() => {
    const sizes = new Set();
    products.forEach(product => {
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach(size => sizes.add(size));
      }
    });
    return Array.from(sizes);
  }, [products]);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsBySubCategory(id));
    // Reset filters when category changes
    setFilters({
      priceRange: [0, 5000],
      selectedBrands: [],
      selectedSizes: [],
      selectedRating: null,
      inStock: false,
      onSale: false
    });
    setSortBy("newest");
  }, [dispatch, id]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Brand filter
    if (filters.selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        filters.selectedBrands.includes(product.brand)
      );
    }

    // Size filter
    if (filters.selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.some(size => 
          filters.selectedSizes.includes(size)
        )
      );
    }

    // Rating filter
    if (filters.selectedRating) {
      filtered = filtered.filter(product => 
        (product.rating || 0) >= filters.selectedRating
      );
    }

    // In Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // On Sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.discount > 0);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleWishlistToggle = async (product) => {
    const wishlistItem = wishlistItems.find(
      (item) => item.productId?._id === product._id
    );

    try {
      if (wishlistItem) {
        await dispatch(removeFromWishlist(wishlistItem._id));
        showToast(`Removed from wishlist`, "info");
      } else {
        await dispatch(
          addToWishlist({
            productId: product._id,
          })
        );
        showToast(`Added to wishlist!`, "success");
      }
      dispatch(getWishlist());
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  const handleAddToCart = async (product, size) => {
    if (!size) {
      showToast("Please select a size first!", "error");
      return;
    }
    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1,
          size: size,
        })
      ).unwrap();
      showToast(`Added to cart!`, "success");
    } catch (err) {
      showToast("Failed to add to cart. Please try again.", "error");
    }
  };

  // Filter handlers
  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  const handleSizeToggle = (size) => {
    setFilters(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter(s => s !== size)
        : [...prev.selectedSizes, size]
    }));
  };

  const handleRatingSelect = (rating) => {
    setFilters(prev => ({
      ...prev,
      selectedRating: prev.selectedRating === rating ? null : rating
    }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      selectedBrands: [],
      selectedSizes: [],
      selectedRating: null,
      inStock: false,
      onSale: false
    });
    setSortBy("newest");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.selectedBrands.length > 0) count++;
    if (filters.selectedSizes.length > 0) count++;
    if (filters.selectedRating) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count++;
    return count;
  };

  // Fixed renderStars function
  const renderStars = (rating) => {
    const validRating = Math.max(0, Math.min(5, Number(rating) || 0));
    
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
    
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-[10px]" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-[10px]" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300 text-[10px]" />
        ))}
      </>
    );
  };

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full aspect-square bg-gray-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="flex gap-1">
          <div className="h-6 bg-gray-200 rounded w-10"></div>
          <div className="h-6 bg-gray-200 rounded w-10"></div>
          <div className="h-6 bg-gray-200 rounded w-10"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 w-80 animate-slideInRight">
            <div className={`relative p-3 rounded-xl shadow-2xl backdrop-blur-md border ${
              toast.type === "success" 
                ? "bg-green-50 border-green-500" 
                : toast.type === "error" 
                ? "bg-red-50 border-red-500"
                : toast.type === "info"
                ? "bg-blue-50 border-blue-500"
                : "bg-gray-50 border-gray-500"
            }`}>
              <button 
                onClick={() => setToast(null)}
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors text-sm"
              >
                <FaTimes />
              </button>
              <div className="flex items-start gap-2 pr-5">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  toast.type === "success" 
                    ? "bg-green-100" 
                    : toast.type === "error" 
                    ? "bg-red-100"
                    : toast.type === "info"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}>
                  {toast.type === "success" && "✅"}
                  {toast.type === "error" && "❌"}
                  {toast.type === "info" && "ℹ️"}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    toast.type === "success" 
                      ? "text-green-800" 
                      : toast.type === "error" 
                      ? "text-red-800"
                      : toast.type === "info"
                      ? "text-blue-800"
                      : "text-gray-800"
                  }`}>
                    {toast.message}
                  </p>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-0.5 overflow-hidden">
                    <div className={`h-full rounded-full animate-progress ${
                      toast.type === "success" 
                        ? "bg-green-500" 
                        : toast.type === "error" 
                        ? "bg-red-500"
                        : toast.type === "info"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#306D29] to-[#4CAF50] shadow-xl">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-white text-xs font-medium">🔥 Trending Now</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Explore Our <span className="text-[#E7E1B1]">Collection</span>
                </h1>
                <p className="text-white/80 text-sm max-w-2xl">
                  Discover handpicked products crafted with excellence
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center border border-white/30">
                  <p className="text-xl font-bold text-white">{filteredProducts.length}</p>
                  <p className="text-white/80 text-[10px]">Products</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center border border-white/30">
                  <p className="text-xl font-bold text-white">
                    {filteredProducts.filter(p => p.discount > 0).length}
                  </p>
                  <p className="text-white/80 text-[10px]">On Sale</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Filter and View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 text-sm font-medium"
            >
              <FaFilter className="text-[#306D29] text-xs" />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 bg-[#306D29] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
            
            <div className="flex items-center gap-0.5 bg-white rounded-lg shadow-md p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" 
                    ? "bg-[#306D29] text-white shadow-md" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <FaThLarge className="text-xs" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all duration-300 ${
                  viewMode === "list" 
                    ? "bg-[#306D29] text-white shadow-md" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <FaThList className="text-xs" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white rounded-lg shadow-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#306D29]"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Popularity</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-xl p-4 mb-6 animate-slideDown">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Filter */}
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full accent-[#306D29] h-1" 
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">Brand</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center gap-1.5 text-xs cursor-pointer hover:text-[#306D29] transition-colors">
                        <input 
                          type="checkbox" 
                          checked={filters.selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="accent-[#306D29] w-3 h-3" 
                        /> 
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Filter */}
              {availableSizes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">Size</h4>
                  <div className="flex flex-wrap gap-1">
                    {availableSizes.map(size => (
                      <button 
                        key={size} 
                        onClick={() => handleSizeToggle(size)}
                        className={`px-2.5 py-1 border rounded-lg text-xs transition-all duration-300 ${
                          filters.selectedSizes.includes(size)
                            ? "bg-[#306D29] text-white border-[#306D29]"
                            : "hover:bg-[#306D29] hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating Filter */}
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Rating</h4>
                <div className="space-y-1">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-1.5 text-xs cursor-pointer hover:text-[#306D29] transition-colors">
                      <input 
                        type="radio" 
                        name="rating"
                        checked={filters.selectedRating === rating}
                        onChange={() => handleRatingSelect(rating)}
                        className="accent-[#306D29] w-3 h-3" 
                      />
                      <span className="flex items-center gap-0.5">
                        {renderStars(rating)} & Up
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.inStock}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="accent-[#306D29] w-4 h-4" 
                />
                In Stock Only
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.onSale}
                  onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                  className="accent-[#306D29] w-4 h-4" 
                />
                On Sale
              </label>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-wrap justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={clearAllFilters}
                className="px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-50 transition-all duration-300"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="px-4 py-1.5 bg-[#306D29] text-white rounded-lg text-sm hover:bg-[#255420] transition-all duration-300"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-gray-500">Active Filters:</span>
            {filters.selectedBrands.map(brand => (
              <span key={brand} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#306D29]/10 text-[#306D29] rounded-full text-xs">
                {brand}
                <button onClick={() => handleBrandToggle(brand)} className="hover:text-red-500">
                  <FaTimes className="w-2 h-2" />
                </button>
              </span>
            ))}
            {filters.selectedSizes.map(size => (
              <span key={size} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#306D29]/10 text-[#306D29] rounded-full text-xs">
                Size: {size}
                <button onClick={() => handleSizeToggle(size)} className="hover:text-red-500">
                  <FaTimes className="w-2 h-2" />
                </button>
              </span>
            ))}
            {filters.selectedRating && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#306D29]/10 text-[#306D29] rounded-full text-xs">
                {filters.selectedRating}★ & Up
                <button onClick={() => handleRatingSelect(filters.selectedRating)} className="hover:text-red-500">
                  <FaTimes className="w-2 h-2" />
                </button>
              </span>
            )}
            {filters.inStock && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#306D29]/10 text-[#306D29] rounded-full text-xs">
                In Stock
                <button onClick={() => setFilters(prev => ({ ...prev, inStock: false }))} className="hover:text-red-500">
                  <FaTimes className="w-2 h-2" />
                </button>
              </span>
            )}
            {filters.onSale && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#306D29]/10 text-[#306D29] rounded-full text-xs">
                On Sale
                <button onClick={() => setFilters(prev => ({ ...prev, onSale: false }))} className="hover:text-red-500">
                  <FaTimes className="w-2 h-2" />
                </button>
              </span>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#306D29]/10 text-[#306D29] rounded-full text-xs">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                <button onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 5000] }))} className="hover:text-red-500">
                  <FaTimes className="w-2 h-2" />
                </button>
              </span>
            )}
            <button onClick={clearAllFilters} className="text-xs text-red-500 hover:underline">
              Clear All
            </button>
          </div>
        )}

        {/* Products Grid/List */}
        {loading ? (
          <div className={`grid ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"} gap-3`}>
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={`grid ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"} gap-3`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={() => setHoveredProductId(product._id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  {/* Product Image Container */}
                  <div className="relative w-full overflow-hidden bg-gray-100">
                    <div className="relative" style={{ paddingBottom: '100%' }}>
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <ProductImageSlider 
                          product={product} 
                          navigate={navigate}
                          isHovered={hoveredProductId === product._id}
                        />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-1">
                        {product.discount > 0 && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                            -{product.discount}%
                          </span>
                        )}
                        {product.isNew && (
                          <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[8px] font-bold rounded-full shadow-lg">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Overlay with Icons */}
                      <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="absolute right-1.5 top-1/4 -translate-y-1/2 flex flex-col gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWishlistToggle(product);
                            }}
                            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform translate-x-12 group-hover:translate-x-0 transition-all duration-300 hover:bg-[#306D29] hover:scale-105 group-hover:delay-100"
                          >
                            {wishlistItems.some(item => item.productId?._id === product._id) ? (
                              <FaHeart className="text-red-500 text-sm hover:text-white transition-colors" />
                            ) : (
                              <FaRegHeart className="text-gray-700 text-sm hover:text-white transition-colors" />
                            )}
                          </button>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${product._id}`);
                            }}
                            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform translate-x-12 group-hover:translate-x-0 transition-all duration-300 hover:bg-[#306D29] hover:scale-105 group-hover:delay-150"
                          >
                            <FaEye className="text-gray-700 text-sm hover:text-white transition-colors" />
                          </button>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product, selectedSize[product._id]);
                            }}
                            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform translate-x-12 group-hover:translate-x-0 transition-all duration-300 hover:bg-[#306D29] hover:scale-105 group-hover:delay-200"
                          >
                            <FaShoppingBag className="text-gray-700 text-sm hover:text-white transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-2.5 space-y-1 bg-white">
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-md truncate group-hover:text-[#306D29] transition-colors duration-300">
                          {product.name}
                        </h3>
                        {product.brand && (
                          <p className="text-[10px] text-gray-400">{product.brand}</p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {renderStars(product.rating || 4.5)}
                      </div>
                      <span className="text-[10px] text-gray-500">({product.reviews || 128})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-md font-bold text-[#306D29]">
                        ₹{product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm font-semibold text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        {product.sizes.slice(0, 5).map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize({...selectedSize, [product._id]: size})}
                            className={`px-2 py-0.5 text-[9px] rounded-full border transition-all duration-300 ${
                              selectedSize[product._id] === size
                                ? "bg-[#306D29] text-white border-[#306D29]"
                                : "border-gray-300 hover:border-[#306D29] hover:text-[#306D29]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-[8px] text-gray-400">+{product.sizes.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product, selectedSize[product._id])}
                      className="w-full py-2 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white text-xs font-semibold rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <FaShoppingBag className="text-[10px]" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="text-4xl mb-2">🛍️</div>
                <h2 className="text-xl font-semibold text-gray-700">No Products Found</h2>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-[#306D29] text-white rounded-lg hover:bg-[#255420] transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && filteredProducts.length < products.length && (
          <div className="text-center mt-8">
            <button className="px-6 py-2.5 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-gray-700 text-sm font-medium inline-flex items-center gap-2 hover:text-[#306D29]">
              Load More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default SubCategoryProduct;