import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import camero1 from '../../assets/ecommerce images/camera 1.jpg';
import StarRatings from "react-star-ratings";

const ProductCard = () => {
  const pro = Array(8).fill({
    image: camero1,
    name: "Casual T-Shirt",
    price: "799",
  });

  const options = {
    rating: 4.5,
    starRatedColor: "#f97316",
    numberOfStars: 5,
    name: "rating",
    starDimension: "20px",
    starSpacing: "2px"
  };

  return (
    <div className="px-6 py-10">
      <div className="text-center pe-4">
        <div className="uppercase  text-[22px] font-semibold inline-block text-gray-800">
          Feature Products
          <div className="border-b-2 border-red-500 w-[270px] pt-2"></div>
        </div>
      </div>

      <div className="pt-[40px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pro.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="overflow-hidden h-48 ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>


            <div className="p-4 space-y-2 ">
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>

              <div className="flex items-center gap-2">
                <StarRatings {...options} />
                <span className="text-sm text-gray-500">(250)</span>
              </div>

              <p className="text-red-500 text-xl font-bold">₹{product.price}</p>

              <button className="mt-3 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                <FaShoppingCart className="text-md group-hover:translate-x-1 transition-transform" />
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
