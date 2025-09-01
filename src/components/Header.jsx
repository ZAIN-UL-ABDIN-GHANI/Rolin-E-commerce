// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes, FaShoppingCart, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png";
import { useDarkMode } from "../components/DarkModeContext";
import { updateQuantity, remove } from "../Redux/Cartslice";
import { Link as ScrollLink } from "react-scroll";

const CartPopup = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  // <-- SELECTOR: cart slice is an array in your store, so select state.cart
  const cartItems = useSelector((s) => s.cart || []);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    if (visible) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, onClose]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  const getTotalPrice = () =>
    Number(cartItems.reduce((sum, it) => sum + (Number(it.price || 0) * (it.quantity ?? 1)), 0)).toFixed(2);

  const handleIncrement = (id) => dispatch(updateQuantity({ id, change: 1 }));
  const handleDecrement = (id) => dispatch(updateQuantity({ id, change: -1 }));
  const handleRemove = (id) => dispatch(remove(id));

  return (
    <>
      {visible && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}

      <motion.aside
        ref={popupRef}
        initial={{ x: "100%" }}
        animate={{ x: visible ? 0 : "100%" }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white dark:bg-black z-50 shadow-xl p-4 flex flex-col"
        aria-hidden={!visible}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Shopping Cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="text-2xl leading-none">
            &times;
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {cartItems.length ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100">{item.title}</h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={(item.quantity ?? 1) <= 1}
                      className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity ?? 1}</span>
                    <button onClick={() => handleIncrement(item.id)} className="px-2 py-1 border border-gray-300 rounded">
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    ${((item.price || 0) * (item.quantity ?? 1)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-lg leading-none"
                    aria-label={`Remove ${item.title}`}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-600 dark:text-gray-300">No items in cart</div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-4 font-semibold text-gray-800 dark:text-gray-100">
            <span>Subtotal:</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div className="space-y-2">
            <a href="/cart" className="block w-full text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">
              View Cart
            </a>
            <a href="/checkout" className="block w-full text-center py-2 border border-gray-300 rounded">
              Checkout
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  // <-- SELECTOR: use state.cart (array)
  const cartItems = useSelector((s) => s.cart || []);
  const totalQuantity = cartItems.reduce((acc, it) => acc + (it.quantity ?? 1), 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  // bump & notification logic unchanged...
  const prevCountRef = useRef(totalQuantity);
  const [bump, setBump] = useState(false);
  const [addedNotification, setAddedNotification] = useState({ visible: false, text: "" });
  const notifyTimeoutRef = useRef(null);

  useEffect(() => {
    const prev = prevCountRef.current;
    if (totalQuantity > prev) {
      setBump(true);
      const last = cartItems.length ? cartItems[cartItems.length - 1] : null;
      const text = last?.title ? `Added: ${last.title}` : "Item added";
      setAddedNotification({ visible: true, text });
      clearTimeout(notifyTimeoutRef.current);
      notifyTimeoutRef.current = setTimeout(() => {
        setAddedNotification({ visible: false, text: "" });
      }, 1400);
      setTimeout(() => setBump(false), 350);
    }
    prevCountRef.current = totalQuantity;
    return () => clearTimeout(notifyTimeoutRef.current);
  }, [totalQuantity, cartItems]);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Products", path: "products" },
    { link: "Features", path: "features" },
    { link: "Testimonial", path: "testimonials" },
    { link: "Contact", path: "contact" },
  ];

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || cartVisible ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, cartVisible]);

  const handleScroll = (path) => {
    closeMenu();
    if (path === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(path);
      if (el) {
        const elementTop = el.offsetTop;
        const headerHeight = 40;
        const desiredGap = 30;
        const pos = Math.max(0, elementTop - headerHeight - desiredGap);
        window.scrollTo({ top: pos, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <nav
        className={`${
          darkMode ? "dark bg-black text-white" : "light bg-white text-black"
        } w-full justify-between gap-4 top-0 px-4 sticky pb-[12px] left-0 z-20 uppercase shadow`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="lg:w-[150px] w-[120px] dark:invert" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden uppercase gap-8 md:flex md:items-center">
              <div className="ml-10 flex items-baseline space-x-4 rounded-lg cursor-pointer">
                {navItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleScroll(item.path)}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F9AD3A] dark:hover:bg-[#034FC3] cursor-pointer transition-colors"
                  >
                    {item.link}
                  </div>
                ))}
              </div>
            </div>

            {/* Right-side icons */}
            <div className="flex items-center  top-1 space-x-5 relative">
              {/* Dark Mode Toggle - centered vertically */}
              <div className="hidden md:fixed  right-40 z-10">
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${darkMode ? "bg-gray-100" : "bg-gray-400"}`}
                  aria-label="Toggle Dark Mode"
                >
                  <span
                    className={`absolute left-0.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-6 bg-gray-400" : "translate-x-0 bg-gray-100"}`}
                  />
                </button>
              </div>

              {/* Cart */}
              <div className="relative cursor-pointer" onClick={() => setCartVisible(true)} aria-label="Open cart">
                <FaShoppingCart className="text-3xl" />
                {totalQuantity > 0 && (
                  <motion.span
                    animate={bump ? { scale: 1.35 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 14 }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white text-xs flex items-center justify-center shadow-lg border-2 border-white/30"
                  >
                    {totalQuantity}
                  </motion.span>
                )}

                
              </div>

              {/* User / Login */}
              <div className="hidden md:flex items-center">
                <a href="/login" className="flex items-center">
                  <FaUserCircle className="text-2xl text-gray-600 dark:text-white" />
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md dark:hover:bg-[#034FC3] hover:bg-[#F9AD3A] transition-colors"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <>
            <div className="md:hidden absolute top-full left-0 w-full z-30">
              <div
                className={`${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                } px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700 cursor-pointer shadow-lg`}
              >
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleScroll(item.path)}
                    className="block px-3 py-2 rounded-md text-lg font-medium dark:hover:bg-[#034FC3] hover:bg-[#F9AD3A] cursor-pointer transition-colors"
                  >
                    {item.link}
                  </div>
                ))}
              </div>
            </div>

            {/* overlay to close mobile menu when clicking outside */}
            <div className="fixed inset-0 bg-black bg-opacity-70 z-10 md:hidden" onClick={closeMenu} />
          </>
        )}
      </nav>

      {/* Cart popup */}
      <CartPopup visible={cartVisible} onClose={() => setCartVisible(false)} />
    </>
  );
}
