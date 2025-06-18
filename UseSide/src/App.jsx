import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './Componets/Header/Header';
import Footer from './Componets/Footer/Footer';
import WebFont from 'webfontloader';
import ProductDetails from './Componets/Products/ProductDetails.jsx';
import Products from './Componets/Products/Products';
import Profile from './Componets/Profile/Profile.jsx';
import AllComponetWrape from './Componets/AllComponetWrape/AllComponetWrape';
import SearchOverlayPage from './Componets/SearchResult/SearchOverlayPage';
import AuthForm from './Componets/Profile/Authentication.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Componets/Service/Action/userAction';
import UpdateProfile from './Componets/Profile/UpdateProfile.jsx';
import UpdatePassword from './Componets/Profile/UpdatePassword.jsx'
import ForgetPassword from './Componets/Profile/ForgetPassword.jsx'
import ResetPassword from './Componets/Profile/ResetPassword.jsx'

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/reset/:token' ;

  const dispatch = useDispatch();
  const { isAuthentication, loading } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  useEffect(() => {
    console.log("App Mounted – loadUser() dispatching...");
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<AllComponetWrape />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<SearchOverlayPage />} />
        <Route path="/login" element={isAuthentication ? <Navigate to="/" /> : <AuthForm />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/update-profile' element={<UpdateProfile />} />
        <Route path='/change-password' element={<UpdatePassword />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/reset/:token' element={<ResetPassword />} />


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
