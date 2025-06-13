import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetails } from "../Service/Action/actions";
import LoadingAnimation from "../Loader/Loader";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ProductDetails = () => {
  const [imgId, setImgId] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector((state) => state.productDetails);

  const slideImage = () => {
    const displayWidth = document.querySelector(".img-showcase img:first-child")?.clientWidth;
    const showcase = document.querySelector(".img-showcase");
    if (showcase) {
      showcase.style.transform = `translateX(${-(
        imgId - 1
      ) * displayWidth}px)`;
    }
  };

  useEffect(() => {
    dispatch(getProductsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    slideImage();
    window.addEventListener("resize", slideImage);
    return () => window.removeEventListener("resize", slideImage);
  }, [imgId]);

  return (
    <div className="max-w-6xl mx-auto my-20 px-4">
      {loading ? (
        <LoadingAnimation />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : product ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div>
              <div className="overflow-hidden border rounded-lg">
                <div className="flex transition-transform duration-500 img-showcase">
                  {product.images?.map((img, index) => (
                    <img
                      key={img._id}
                      src={img.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 mt-4 justify-center">
                {product.images?.map((img, index) => (
                  <button
                    key={img._id}
                    className={`w-16 h-16 border rounded-md overflow-hidden ${imgId === index + 1 ? "ring-2 ring-blue-500" : ""
                      }`}
                    onClick={() => setImgId(index + 1)}
                  >
                    <img
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="text-sm text-gray-500 mb-2">Category: {product.category}</div>

              <div className="mb-3 flex items-center">
                <StarRatings
                  rating={product.ratings}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
                <span className="text-sm text-gray-600 ml-2">({product.numOfReview} Reviews)</span>
              </div>

              <div className="text-lg font-semibold mb-4 space-y-1">
                <p className="text-blue-600">Price: ₹{product.price}</p>
                <p className={product.stock < 1 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                  {product.stock < 1 ? "Out of Stock" : "In Stock"}
                </p>
              </div>



              <p className="text-md text-gray-700 mb-4 leading-relaxed">
                {product.description}
              </p>

              <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
                <li>Shipping: Free, All over the world</li>
              </ul>

              <div className="flex space-x-3 mt-6">
                <input
                  type="number"
                  min="1"
                  className="w-20 border border-gray-300 rounded p-2 text-center"
                  defaultValue="1"
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                  Compare
                </button>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h2>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review._id} className="bg-gray-50 p-4 rounded shadow">
                    <div className="flex items-start space-x-4 mb-2">
                      <img
                        src={review.profileImage || "https://www.w3schools.com/w3images/avatar2.png"}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-800">{review.name}</span>
                          <StarRatings
                            rating={review.rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="1px"
                            name="user-rating"
                          />
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 text-sm italic">
                No reviews yet. Be the first to share your thoughts about this product!
              </div>
            )}
          </div>

        </>
      ) : (
        <div>No product found.</div>
      )}
    </div>
  );
};

export default React.memo(ProductDetails);;
