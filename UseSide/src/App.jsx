// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import WebFont from 'webfontloader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Components
import Header from './Componets/Header/Header';
import Footer from './Componets/Footer/Footer';
import AllComponentWrap from './Componets/AllComponetWrape/AllComponetWrape';
import ProductDetails from './Componets/Products/ProductDetails';
import Products from './Componets/Products/Products';
import SearchOverlayPage from './Componets/SearchResult/SearchOverlayPage';
import AuthForm from './Componets/Profile/Authentication';
import Profile from './Componets/Profile/Profile';
import UpdateProfile from './Componets/Profile/UpdateProfile';
import UpdatePassword from './Componets/Profile/UpdatePassword';
import ForgetPassword from './Componets/Profile/ForgetPassword';
import ResetPassword from './Componets/Profile/ResetPassword';
import CartProducts from './Componets/Products/CartProducts';
import ShippingInfo from './Componets/Products/ShippingInfo';
import ConfirmOrder from './Componets/Products/ConfirmOrder';
import ProcessPayment from './Componets/Products/ProcessPayments';
import { loadUser } from './Componets/Service/Action/userAction';



const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" />;
};

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname.includes('/reset');

  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const { isAuthentication, loading } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  const getStripeApiKey = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://localhost:3005/api/v1/stripeApiKey',config);
      setStripeApiKey(data.StripeApiKey);
    } catch (error) {
      console.error("Failed to load Stripe API key", error);
    }
  };

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<AllComponentWrap />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<SearchOverlayPage />} />

        <Route path="/login" element={isAuthentication ? <Navigate to="/" /> : <AuthForm />} />

        <Route path="/profile" element={<ProtectedRoute isAuth={isAuthentication}><Profile /></ProtectedRoute>} />
        <Route path="/update-profile" element={<ProtectedRoute isAuth={isAuthentication}><UpdateProfile /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute isAuth={isAuthentication}><UpdatePassword /></ProtectedRoute>} />

        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<CartProducts />} />
        <Route path="/shipping" element={<ProtectedRoute isAuth={isAuthentication}><ShippingInfo /></ProtectedRoute>} />
        <Route path="/order/confirm" element={<ProtectedRoute isAuth={isAuthentication}><ConfirmOrder /></ProtectedRoute>} />

        <Route
          path="/proccess/payment"
          element={
            stripeApiKey ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute isAuth={isAuthentication}>
                  <ProcessPayment />
                </ProtectedRoute>
              </Elements>
            ) : (
              <div className="text-center py-10 text-gray-600">Loading payment gateway...</div>
            )
          }
        />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
