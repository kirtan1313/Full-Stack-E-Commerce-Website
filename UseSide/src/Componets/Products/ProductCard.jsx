import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Service/Action/actions";
import LoadingAnimation from "../Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const ProductCard = React.memo(() => {
  const dispatch = useDispatch();
  const { loading, error, products, productCounte } = useSelector(
    (state) => state.products
  );

 useEffect(() => {
  console.log("Error:", error);

  if (error) {
    toast.error(error, {
      position: "bottom-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  }

  dispatch(getAllProducts());
}, [dispatch, error]);

  return (
    <div>
      {
        loading ?
          <div className="h-screen flex justify-center items-center bg-gray-100">
            <LoadingAnimation />
          </div>
          : (
            <div className="px-6 py-10 cursor-pointer">
              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 uppercase">
                  Feature <span className="text-red-500">Products</span>
                </h2>
                <div className="mt-1 mx-auto w-24 h-1 bg-red-500 rounded"></div>
              </div>

              {/* Product Grid */}
              <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                      >
                        {/* Image */}
                        <div className="h-44 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-lg">
                          <img
                            src={product.images[0]?.url?.trim()}
                            alt={product.name}
                            className="h-full object-contain p-3"
                          />
                        </div>

                        {/* Details */}
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
            </div>
          )
      }
    </div>
  );
});

export default ProductCard;
