import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Service/Action/actions";
import LoadingAnimation from "../../Loader/Loader";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const Products = React.memo(() => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, products, ProductCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = ProductCount || 0;
  const totalPages = Math.ceil(totalProducts / resultPerPage);

  const [category, setCategory] = useState("All");
  const categories = ["All", "Electronics", "Clothing", "Footwear", "Grocery"];

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "colored",
      });
    }

    dispatch(getAllProducts(keyword || "", currentPage, category === "All" ? "" : category.toLowerCase()));
  }, [dispatch, keyword, currentPage, category, error]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-20 px-4 py-10">
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-gray-100">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 uppercase">
              {category}
            </h2>
            <div className="mt-1 mx-auto w-48 h-1 bg-red-500 rounded"></div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition
                  ${category === cat
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                        className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                      >
                        <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded z-10">
                          ₹{product.price}
                        </div>

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
              {totalPages >= 1 && (
                <div className="flex justify-center mt-10 mb-10">
                  <ul className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <li key={page}>
                          <button
                            onClick={() => handlePageClick(page)}
                            className={`px-4 py-2 rounded-md text-sm font-medium border transition 
                              ${currentPage === page
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
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default Products;
