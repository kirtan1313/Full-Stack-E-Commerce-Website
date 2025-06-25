import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../Loader/Loader";
import { OrdersDetails } from "../../Service/Action/orderAction";
import { FaTruck, FaMoneyCheckAlt, FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(OrdersDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingAnimation />
      </div>
    );
  }

  if (!order || !order.shippingInfo) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Order not found or shipping information is missing.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br to-white py-10 px-4 mt-15">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">🧾 Order Details</h2>

        {/* Shipping Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3 flex items-center text-gray-800">
            <FaMapMarkerAlt className="mr-2 text-blue-600" /> Shipping Information
          </h3>
          <div className="text-gray-700 space-y-1">
            <p><strong>Name:</strong> {order.shippingInfo?.firstName} {order.shippingInfo?.lastName}</p>
            <p><strong>Phone:</strong> {order.shippingInfo?.phone}</p>
            <p>
              <strong>Address:</strong> {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.zip}, {order.shippingInfo?.country}
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3 flex items-center text-gray-800">
            <FaMoneyCheckAlt className="mr-2 text-green-600" /> Payment Information
          </h3>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span className={`inline-block px-3 py-1 text-white text-sm rounded-full 
              ${order.paymentInfo?.status === "succeeded" ? "bg-green-500" : "bg-red-500"}`}>
              {order.paymentInfo?.status || "N/A"}
            </span>
          </p>
          <p className="text-gray-700 mt-1"><strong>Amount Paid:</strong> ₹{order.totalPrice}</p>
        </div>

        {/* Order Status */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3 flex items-center text-gray-800">
            <FaTruck className="mr-2 text-yellow-500" /> Order Status
          </h3>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span className={`inline-block px-3 py-1 text-white text-sm rounded-full
              ${order.orderStatus === "Delivered" ? "bg-green-600" : "bg-yellow-500"}`}>
              {order.orderStatus}
            </span>
          </p>
          <p className="text-gray-700 mt-1">
            <strong>Ordered At:</strong>{" "}
            {order.paidAt && new Date(order.paidAt).toLocaleString()}
          </p>
        </div>

        {/* Ordered Items */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
            <FaBoxOpen className="mr-2 text-purple-600" /> Ordered Items
          </h3>
          <div className="space-y-4">
            {order.orderItmes?.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg transform hover:scale-105 transition duration-200"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
