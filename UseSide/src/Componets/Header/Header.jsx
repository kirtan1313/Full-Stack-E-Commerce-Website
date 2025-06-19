import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingCart, FaTimes, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Service/Action/userAction";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthentication, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartProducts)

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSearchIconClick = () => navigate("/search");


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownItems = [
    { label: "👤 Profile", path: "/profile", },
    { label: "📦 Orders", path: "/orders", },
  ];

  if (user?.role === "admin") {
    dropdownItems.unshift({ label: "🛠️ Dashboard", path: "/admin/dashboard" });
  }




  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="h-10 flex items-center">
          <Link to="/" className="text-xl font-bold text-red-500">E-Commerce</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-red-500">Products</Link>
          <Link to="/contact" className="text-gray-700 hover:text-red-500">Contact</Link>
          <Link to="/about" className="text-gray-700 hover:text-red-500">About</Link>
        </div>

        {/* Icons & Avatar */}
        <div className="flex items-center space-x-4 text-xl text-gray-700 relative">
          <button onClick={handleSearchIconClick} className="hover:text-red-500">
            <FaSearch />
          </button>

          <Link to="/cart" className="relative hover:text-red-500">
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </div>
            )}
          </Link>

          {isAuthentication ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={`http://localhost:3005${user.avatar?.url}`}
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer border hover:ring hover:ring-red-300"
                onClick={toggleDropdown}
              />
              {/* Dropdown */}
              <div className={`absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg text-sm overflow-hidden transition-all duration-200 ${dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                {dropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-red-500">
              <FaUserAlt />
            </Link>
          )}

          <button onClick={toggleMenu} className="lg:hidden ml-2 hover:text-red-500">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-4 flex flex-col space-y-3 shadow-md">
          <Link to="/" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/products" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Products</Link>
          <Link to="/contact" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Contact</Link>
          <Link to="/about" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">About</Link>
          <Link to="/cart" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Cart</Link>

          {isAuthentication ? (
            <>
              {dropdownItems.map((item, index) => (
                <Link key={index} to={item.path} onClick={toggleMenu} className="text-gray-700 hover:text-red-500">{item.label}</Link>
              ))}
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="text-gray-700 hover:text-red-500 text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="text-gray-700 hover:text-red-500">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
