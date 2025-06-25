import React from "react";
import { Link } from "react-router-dom";
// import { CheckCircle } from "lucide-react";

const SuccessPayment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        {/* <CheckCircle className="text-green-500 mx-auto mb-4" size={60} /> */}

        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>

        <Link
          to="/me/order"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
