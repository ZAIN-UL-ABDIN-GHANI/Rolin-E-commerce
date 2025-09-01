//ProductCard.jsx
import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useDarkMode } from './DarkModeContext';

/**
 * ProductCard Component
 * @param {Object} product - Product object with id, title, price, category, image, description, rating
 * @param {Function} onAdd - Function to handle add to cart action
 * @param {boolean} showRating - Whether to show rating stars (default: true)
 */
function ProductCard({ product, onAdd, showRating = true }) {
  const { darkMode } = useDarkMode();

  // Handle add to cart click
  const handleAddClick = () => {
    onAdd(product);
  };

  // Render rating stars
  const renderRating = () => {
    if (!showRating || !product.rating) return null;
    
    const rating = product.rating.rate || product.rating;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`h-4 w-4 ${
              index < fullStars 
                ? 'text-yellow-400' 
                : index === fullStars && hasHalfStar 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
            }`}
          />
        ))}
        {product.rating.count && (
          <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({product.rating.count})
          </span>
        )}
      </div>
    );
  };

  return (
    <article 
      className={`group rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-98 hover:scale-100 shadow-lg ${
        darkMode 
          ? 'dark:bg-white dark:text-black shadow-gray-900/20' 
          : 'bg-white shadow-gray-300/20'
      }`}
    >
      {/* Image Container - Square aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Pill Overlay */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        {renderRating()}

        {/* Title - Truncated to 2 lines */}
        <h3 className={`font-semibold leading-tight line-clamp-2 ${
          darkMode ? 'text-gray-900 dark:text-black' : 'text-gray-900'
        }`}>
          {product.title}
        </h3>

        {/* Price - Prominent display */}
        <div className="text-2xl font-bold text-red-600">
          ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
        </div>

        {/* Add to Cart Button - Full width on mobile, responsive */}
        <button
          onClick={handleAddClick}
          className="w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-98 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          aria-label={`Add ${product.title} to cart`}
        >
          <FaShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;