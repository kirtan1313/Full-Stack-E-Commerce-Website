import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetails, newReviews } from "../../Service/Action/actions";
import LoadingAnimation from "../../Loader/Loader";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { addItemToCart } from "../../Service/Action/cartAction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import userReview from '../../../assets/ecommerce images/userreview.jpg'

const ProductDetails = () => {
  const [imgId, setImgId] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comments, setComment] = useState("");

  const { loading, product, error } = useSelector((state) => state.productDetails);
  const { success } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.user)
  const scrollRef = useRef(null);

  

  useEffect(() => {
    const displayWidth = document.querySelector(".img-showcase img:first-child")?.clientWidth;
    const showcase = document.querySelector(".img-showcase");
    if (showcase) {
      showcase.style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
    }
  }, [imgId]);

  const increment = () => {
    if (product.stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const AddToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert("Item Added To Cart");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      return alert("Please provide rating and comment");
    }
    const myForm = new FormData();
    myForm.append("rating", rating);
    myForm.append("comment", comments);
    myForm.append("productId", id);
    myForm.append("name", user.name);
    myForm.append("_id", user._id);
    dispatch(newReviews(myForm));
    setRating(0);
    setComment("");
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getProductsDetails(id));

    if(success){
      alert("Products Review Successfully..")
    }
  }, [dispatch, id,success]);

  return (
    <div className="max-w-6xl mx-auto my-20 px-4">
      {loading ? (
        <LoadingAnimation />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : product ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="border rounded-xl overflow-hidden shadow-md">
                <div className="flex img-showcase transition-transform duration-500">
                  {product.images?.map((img, index) => (
                    <img key={img._id} src={img.url} alt={`Product ${index + 1}`} className="w-full" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                {product.images?.map((img, index) => (
                  <button
                    key={img._id}
                    className={`w-16 h-16 rounded-md border-2 ${imgId === index + 1 ? "border-blue-600" : "border-gray-300"}`}
                    onClick={() => setImgId(index + 1)}
                  >
                    <img src={img.url} className="w-full h-full object-cover rounded-md" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-500 text-sm mb-3">Category: {product.category}</p>
              <div className="flex items-center gap-2 mb-4">
                <StarRatings
                  rating={product.ratings}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="22px"
                  starSpacing="2px"
                  name="rating"
                />
                <span className="text-gray-600 text-sm">({product.numOfReview} reviews)</span>
              </div>
              <p className="text-xl font-semibold text-blue-600 mb-2">₹{product.price}</p>
              <p className={product.stock < 1 ? "text-red-600" : "text-green-600"}>{product.stock < 1 ? "Out of Stock" : "In Stock"}</p>
              <p className="text-gray-700 mt-4 mb-3">{product.description}</p>
              <div className="flex items-center gap-3 mt-6">
                <button onClick={decrement} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">-</button>
                <input type="text" readOnly value={quantity} className="w-14 text-center border rounded font-medium text-lg" />
                <button onClick={increment} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">+</button>
                <button
                  onClick={AddToCartHandler}
                  disabled={product.stock < 1}
                  className={`px-6 py-2 rounded text-white font-semibold ${product.stock < 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Customer Review Slider */}
          <div className="mt-14 relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h2>
            {user && product.reviews?.length > 0 ? (
              <div className="relative">
                <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth px-10">
                  {product.reviews.map((review) => (
                    <div key={review._id} className="min-w-[300px] w-[300px] h-[230px] bg-white border rounded-lg p-5 shadow-md flex-shrink-0">
                      <div className=" items-center gap-4 mb-2">

                        <div className="flex justify-center">
                          <img
                            src={userReview}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex justify-center">
                          <p className="font-medium text-gray-800">{user.name}</p>
                        </div>
                        <div className="flex justify-center">
                          <StarRatings
                            rating={review.rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="2px"
                            name="user-rating"
                          />
                        </div>


                      </div>
                      <p className="text-gray-600 text-sm line-clamp-4">{review.comments}</p>
                    </div>
                  ))}
                </div>
                <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>

          {/* Submit Review */}
          <div className="mt-12 max-w-xl bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Your Rating:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                    >★</button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-gray-700 font-medium mb-1">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  value={comments}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Write your experience..."
                  required
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow"
                >Submit Review</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div>No product found.</div>
      )}
    </div>
  );
};

export default ProductDetails;
