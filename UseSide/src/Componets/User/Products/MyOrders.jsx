import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../Service/Action/orderAction";
import LoadingAnimation from "../../Loader/Loader";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Orders</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingAnimation />
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Paid At</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {orders.map((order) =>
                  order.orderItmes.map((item, index) => (
                    <tr key={`${order._id}-${index}`} className="hover:bg-gray-50">
                    
                      <td className="px-4 py-4">
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                        <td className="px-4 py-4 text-gray-700">{order._id}</td>
                      <td className="px-4 py-4 text-gray-800 font-medium">{item.name}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-800">₹{order.totalPrice}</td>
                      <td className="px-4 py-4 text-gray-600">
                        {new Date(order.paidAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/order/${order._id}`}
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
