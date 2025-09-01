// FILE: src/pages/Product.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FaSearch, FaTimes, FaHeart, FaShoppingCart } from "react-icons/fa";
import { add } from "../../Redux/Cartslice";
import { useDarkMode } from "../../components/DarkModeContext";

function normalizeProduct(raw) {
  const product = {
    id: raw.id,
    title: raw.title ?? raw.name ?? "Untitled",
    price: Number(raw.price ?? 0),
    description: raw.description ?? raw.summary ?? "",
    image: raw.image ?? raw.img ?? raw.thumbnail ?? "",
    category: raw.category ?? "uncategorized",
    agent: raw.agent ?? raw.seller ?? "Seller",
    baths: raw.baths ?? Math.floor(Math.random() * 3) + 1,
    beds: raw.beds ?? Math.floor(Math.random() * 5) + 1,
    area: raw.area ?? Math.floor(Math.random() * 2000) + 200,
    __raw: raw,
  };
  return product;
}

// Helper function to truncate text
const truncateText = (text, maxWords) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

// ProductCard component with white/gray/black styling and dark mode
const ProductCard = ({ product, onAdd, darkMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    if (onAdd && product) {
      onAdd({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!product) return null;

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border max-w-xs`}>
      {/* Image Container */}
      <div className={`relative ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} h-40 overflow-hidden`}>
        {/* Heart Icon */}
        <button
          onClick={toggleLike}
          className={`absolute top-2 right-2 z-10 w-7 h-7 ${darkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'} hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm`}
        >
          <FaHeart 
            className={`w-3 h-3 transition-colors ${
              isLiked ? 'text-red-500' : darkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-400 hover:text-red-400'
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="w-full h-full flex items-center justify-center p-3">
          {!imageLoaded && (
            <div className={`w-20 h-20 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
          )}
          <img
            src={product.image}
            alt={product.title}
            className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.style.display = 'none';
              setImageLoaded(true);
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Tag */}
        <div className="mb-2">
          <span className={`inline-block px-2 py-1 text-xs font-medium ${darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-600 bg-gray-100'} rounded-md`}>
            {product.category?.toUpperCase()}
          </span>
        </div>

        {/* Title - Limited to 3 words */}
        <h3 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 line-clamp-2 leading-tight`}>
          {truncateText(product.title, 3)}
        </h3>

        {/* Description - Limited to 16 words */}
        <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3 line-clamp-2 leading-relaxed`}>
          {truncateText(product.description, 16)}
        </p>

        {/* Price and Button Container */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex flex-col">
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`${darkMode ? 'bg-white hover:bg-gray-100 text-gray-900' : 'bg-gray-900 hover:bg-black text-white'} px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow-md transform hover:scale-105`}
          >
            <FaShoppingCart className="w-3 h-3" />
            <span className="text-xs">Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Product() {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  const reduxProductsRaw = useSelector((state) =>
    Array.isArray(state.product?.data)
      ? state.product.data
      : Array.isArray(state.products?.items)
      ? state.products.items
      : Array.isArray(state.productsList?.items)
      ? state.productsList.items
      : []
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // load products from redux if present, else fetch from API
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        if (reduxProductsRaw && reduxProductsRaw.length > 0) {
          const normalized = reduxProductsRaw.map(normalizeProduct);
          if (!cancelled) setProducts(normalized);
        } else {
          const res = await axios.get("https://fakestoreapi.com/products");
          const data = Array.isArray(res.data) ? res.data : [];
          const normalized = data.map(normalizeProduct);
          if (!cancelled) setProducts(normalized);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load products. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reduxProductsRaw]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const s = debouncedSearchTerm?.toLowerCase?.() ?? "";
    return products.filter((p) => {
      if (!p) return false;
      const matchesSearch =
        !s ||
        (p.title && p.title.toLowerCase().includes(s)) ||
        (p.description && p.description.toLowerCase().includes(s));
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    dispatch(add(product));
  };

  const handleLoadMore = () => setVisibleCount((v) => v + 6);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <div id="products" className={`${darkMode ? "dark bg-black" : "light bg-gray-100"} min-h-screen py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Our Products</h1>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Discover amazing products at great prices
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
            </div>

            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full pl-10 pr-4 py-3 border rounded-lg transition-colors focus:outline-none ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
              }`}
              aria-label="Search products by title or description"
            />
          </div>

          {/* Category Filters - Buttons on Desktop, Dropdown on Mobile */}
          <div className="flex flex-col items-center">
            {/* Mobile Dropdown */}
            <div className="block md:hidden w-full max-w-sm">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                }`}
                aria-label="Filter products by category"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === ""
                    ? darkMode
                      ? "bg-white text-gray-900"
                      : "bg-gray-900 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? darkMode
                        ? "bg-white text-gray-900"
                        : "bg-gray-900 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

          
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className={`text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>Loading products...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>No products found</div>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredProducts
                .filter(Boolean)
                .slice(0, visibleCount)
                .map((product, idx) => (
                  <ProductCard
                    key={product?.id ?? `p-${idx}`}
                    product={product}
                    onAdd={(payload) => handleAddToCart(payload)}
                    darkMode={darkMode}
                  />
                ))}
            </div>

            {/* Load More/Less Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {visibleCount < filteredProducts.length && (
                <button
                  onClick={handleLoadMore}
                  className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                    darkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-black"
                  }`}
                >
                  Load More
                </button>
              )}
              
              {visibleCount > 6 && (
                <button
                  onClick={() => setVisibleCount(6)}
                  className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                    darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  Load Less
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}