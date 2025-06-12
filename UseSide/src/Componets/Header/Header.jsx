import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserAlt,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleSearchIconClick = () => navigate("/search");

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="h-10 flex items-center">
          <Link to="/" className="text-xl font-bold text-red-500">
            E-Commerce
          </Link>
        </div>
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-red-500">Products</Link>
          <Link to="/contact" className="text-gray-700 hover:text-red-500">Contact</Link>
          <Link to="/about" className="text-gray-700 hover:text-red-500">About</Link>
        </div>
        <div className="flex items-center space-x-4 text-xl text-gray-700">
          <button onClick={handleSearchIconClick} className="hover:text-red-500">
            <FaSearch />
          </button>
          <Link to="/cart" className="hover:text-red-500">
            <FaShoppingCart />
          </Link>
          <Link to="/login" className="hover:text-red-500">
            <FaUserAlt />
          </Link>
          <button onClick={toggleMenu} className="lg:hidden ml-2 hover:text-red-500">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-4 flex flex-col space-y-3 shadow-md">
          <Link to="/" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/products" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Products</Link>
          <Link to="/contact" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Contact</Link>
          <Link to="/about" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">About</Link>
          <Link to="/cart" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Cart</Link>
          <Link to="/login" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;