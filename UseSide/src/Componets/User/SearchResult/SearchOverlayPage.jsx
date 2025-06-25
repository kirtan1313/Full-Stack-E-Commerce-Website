import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchOverlayPage = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <form
        onSubmit={handleSearch}
        className="w-3/4 md:w-1/2 lg:w-1/3 relative"
      >
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500"
        >
          <FaSearch />
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-700 text-2xl hover:text-red-500"
        >
          <FaTimes />
        </button>
      </form>
    </div>
  );
};

export default SearchOverlayPage;