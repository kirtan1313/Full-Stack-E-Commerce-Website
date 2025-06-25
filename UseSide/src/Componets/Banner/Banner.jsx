import React from "react";
import { FaMouse } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-red-500 via-pink-500 to-yellow-400 overflow-hidden mt-[58px] text-white">
      {/* Overlay pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-8 text-center">
        <p className="text-lg sm:text-xl uppercase tracking-widest mb-2 animate-fade-in-down">
          Welcome To Our Store
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase leading-tight animate-fade-in-up drop-shadow-md">
          Discover <span className="text-yellow-300">Amazing</span> Products
        </h1>
        <p className="text-md sm:text-lg mt-4 max-w-xl animate-fade-in-down text-white/90">
          Shop the best items with great deals. Fast delivery, trusted quality.
        </p>

        {/* Scroll Button */}
        <div className="mt-8 animate-bounce">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full font-semibold shadow-lg transition-all duration-300">
            Scroll
            <FaMouse className="text-md" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
