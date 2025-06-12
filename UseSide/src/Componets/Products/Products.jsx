import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Service/Action/actions";
import LoadingAnimation from "../Loader/Loader";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const Products = React.memo(() => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, products, ProductCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const totalProducts = ProductCount || 0;
  const totalPages = Math.ceil(totalProducts / resultPerPage);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "colored",
      });
    }

    dispatch(getAllProducts(keyword, currentPage, priceRange));
  }, [dispatch, keyword, currentPage, priceRange, error]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-20 px-6 py-10">
      {/* Price Filter */}
      <div className="max-w-lg mx-auto mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Filter by Price</h3>
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(priceRange[1] / 50000) * 100}%, #e5e7eb ${(priceRange[1] / 50000) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="text-sm text-gray-600 text-center mt-2">
            ₹0 - ₹{priceRange[1]}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-gray-100">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 uppercase">
              <span>Products</span>
            </h2>
            <div className="mt-1 mx-auto w-48 h-1 bg-red-500 rounded"></div>
          </div>

          {/* Responsive Grid */}
          <div className="pt-10 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products &&
              products.map((product, index) => {
                const ratingOptions = {
                  rating: product.ratings || 0,
                  starRatedColor: "#f97316",
                  numberOfStars: 5,
                  name: `rating-${index}`,
                  starDimension: "18px",
                  starSpacing: "1px",
                };

                return (
                  <Link
                    to={`/productDetails/${product._id}`}
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="h-44 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-lg">
                      <img
                        src={product.images[0]?.url?.trim()}
                        alt={product.name}
                        className="h-full object-contain p-3"
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-medium text-gray-700">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <StarRatings {...ratingOptions} />
                        <span className="text-xs text-gray-500">
                          ({product.numOfReview || 0} Reviews)
                        </span>
                      </div>

                      <p className="text-red-500 text-lg font-semibold">
                        ₹{product.price}
                      </p>

                      <button className="w-full mt-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm transition">
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 mb-10">
              <ul className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <li key={page}>
                      <button
                        onClick={() => handlePageClick(page)}
                        className={`px-4 py-2 rounded-md text-sm font-medium border transition 
                          ${
                            currentPage === page
                              ? "bg-red-500 text-white border-red-500"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default Products;
