import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserAlt,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      {/* Search input for small screens (toggle) */}
      {showSearch && (
        <div className="lg:hidden bg-white w-full px-4 py-2 shadow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="h-10 flex items-center">
          <Link to="/">
            E-Commerce
          </Link>
        </div>

        {/* Search input (visible on large screens only) */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Right side icons & hamburger */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Large screen nav links */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 relative after:block after:h-[2px] after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-red-500 relative after:block after:h-[2px] after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-500 relative after:block after:h-[2px] after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-500 relative after:block after:h-[2px] after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              About
            </Link>

            <Link to="/cart" className="text-xl text-gray-700 hover:text-red-500">
              <FaShoppingCart />
            </Link>
            <Link to="/login" className="text-xl text-gray-700 hover:text-red-500">
              <FaUserAlt />
            </Link>
          </div>

          {/* Small screen search icon */}
          <button
            onClick={toggleSearch}
            className="lg:hidden text-xl text-gray-700 hover:text-red-500"
          >
            <FaSearch />
          </button>

          {/* Hamburger icon (small screens) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-xl text-gray-700 hover:text-red-500"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-4 flex flex-col space-y-3 shadow-md">
          <Link to="/" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">
            Home
          </Link>
          <Link to="/products" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">
            Products
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">
            Contact
          </Link>
          <Link to="/about" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">
            About
          </Link>

          <Link to="/cart" onClick={toggleMenu} className="text-xl text-gray-700 hover:text-red-500">
            <FaShoppingCart />
          </Link>
          <Link to="/login" onClick={toggleMenu} className="text-xl text-gray-700 hover:text-red-500">
            <FaUserAlt />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
