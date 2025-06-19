import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const ProcessPayments = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-15">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Information
            </label>
            <div className="border border-gray-300 rounded px-3 py-2">
              <CardElement />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              value={`pay - ${orderInfo && orderInfo.totalPrice}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessPayments;
