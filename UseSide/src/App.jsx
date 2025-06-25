// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import WebFont from 'webfontloader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { loadCartFromStorage } from "./Componets/Service/Action/cartAction.js";

// User Componets
import Header from './Componets/User/Header/Header.jsx';
import Footer from './Componets/User/Footer/Footer.jsx';
import AllComponentWrap from './Componets/AllComponetWrape/AllComponetWrape';
import ProductDetails from './Componets/User/Products/ProductDetails.jsx';
import Products from './Componets/User/Products/Products.jsx';
import SearchOverlayPage from './Componets/User/SearchResult/SearchOverlayPage.jsx';
import AuthForm from './Componets/User/Profile/Authentication.jsx';
import Profile from './Componets/User/Profile/Profile.jsx';
import UpdateProfile from './Componets/User/Profile/UpdateProfile.jsx';
import UpdatePassword from './Componets/User/Profile/UpdatePassword.jsx';
import ForgetPassword from './Componets/User/Profile/ForgetPassword.jsx';
import ResetPassword from './Componets/User/Profile/ResetPassword.jsx';
import CartProducts from './Componets/User/Products/CartProducts.jsx';
import ShippingInfo from './Componets/User/Products/ShippingInfo.jsx';
import ConfirmOrder from './Componets/User/Products/ConfirmOrder.jsx';
import ProcessPayment from './Componets/User/Products/ProcessPayments.jsx';
import { loadUser } from './Componets/Service/Action/userAction';
import ContactPage from './Componets/User/ContactPage/ContactPage.jsx';
import AboutPage from './Componets/User/AboutPage/AboutPage.jsx';
import SuccessPayment from './Componets/User/Products/SuccessPayment .jsx';
import MyOrders from './Componets/User/Products/MyOrders.jsx'
import OrderDetails from './Componets/User/Products/OrderDetails.jsx'


// Admin Componets
import Dashboard from './Componets/Admin/Dashboard/Dashboard.jsx'



const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ isAuth, user, children }) => {
  if (!isAuth || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function AppContent() {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname === '/login' ||
    location.pathname.includes('/reset') ||
    location.pathname.includes('/admin/dashboard') ||
    location.pathname.includes('/change-password') ||
    location.pathname.includes('/forgetPassword') ||
    location.pathname.includes('/reset/:token') ||
    location.pathname.includes('/proccess/payment') ||
    location.pathname.includes('/success/payment') ||
    location.pathname.includes('/dashboard')


  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const { isAuthentication, loading, user } = useSelector((state) => state.user);

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
      const { data } = await axios.get('http://localhost:3005/api/v1/stripeApiKey', config);
      setStripeApiKey(data.StripeApiKey);
    } catch (error) {
      console.error("Failed to load Stripe API key", error);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(loadCartFromStorage());
    }
  }, [user?._id]);


   if (loading) return <p>Loading...</p>;
  return (
    <>

      {!hideHeaderFooter && <Header />}

      <Routes>

        {/* User Route */}

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

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/success/payment" element={<SuccessPayment />} />
        <Route path="/me/order" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />


        {/* Admin Route */}
        <Route isAdmin={true} path="/admin/dashboard" element={<AdminRoute isAuth={isAuthentication} user={user}><Dashboard /></AdminRoute>} />


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
