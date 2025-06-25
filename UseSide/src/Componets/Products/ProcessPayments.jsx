// ProcessPayments.jsx
import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../Service/Action/orderAction";

const ProcessPayments = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { shipingInfo, cartItems } = useSelector((state) => state.cartProducts);
  console.log('shipingInfo',shipingInfo);
  
  const { user } = useSelector((state) => state.user);

  const [cardHolderName, setCardHolderName] = useState("");

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: shipingInfo, 
    orderItmes: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  }

  const countryCodeMap = {
    India: "IN",
    United_States: "US",
    United_Kingdom: "GB",
    Canada: "CA",
    Australia: "AU",
  };

  const countryCode = countryCodeMap[shipingInfo.country] || "IN";

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:3005/api/v1/payment/proccess",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const clientSecret = data.client_secret || data.Client_secret;

      if (!stripe || !elements) return;

      const card = elements.getElement(CardElement);
      if (!card) {
        alert("Card input not ready");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: cardHolderName,
            email: user.email,
            address: {
              line1: shipingInfo.address,
              city: shipingInfo.city,
              state: shipingInfo.state,
              country: countryCode,
            },
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          dispatch(createOrder(order))
          navigate("/success/payment");
        } else {
          alert("There's some issue while processing payment");
        }
      }
    } catch (error) {
      alert("Payment Failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-12">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>
        <form className="space-y-6" onSubmit={handlerSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Details
            </label>
            <div className="border border-gray-300 rounded px-3 py-2">
              <CardElement />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Pay ₹{orderInfo && orderInfo.totalPrice}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessPayments;
