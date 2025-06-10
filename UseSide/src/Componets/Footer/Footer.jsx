import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../assets/ecommerce images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-[80px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & Social */}
        <div>
          <img src={logo} alt="Logo" className="h-12 mb-4" />
          <p className="text-sm mb-4">Bringing you the best shopping experience.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-red-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-red-400">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-400">Home</a></li>
            <li><a href="#" className="hover:text-red-400">Shop</a></li>
            <li><a href="#" className="hover:text-red-400">About Us</a></li>
            <li><a href="#" className="hover:text-red-400">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-400">FAQ</a></li>
            <li><a href="#" className="hover:text-red-400">Return Policy</a></li>
            <li><a href="#" className="hover:text-red-400">Shipping Info</a></li>
            <li><a href="#" className="hover:text-red-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Join Our Newsletter</h3>
          <p className="text-sm mb-2">Stay updated with our latest offers</p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
