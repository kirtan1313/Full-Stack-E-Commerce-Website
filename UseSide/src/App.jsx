import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Componets/Header/Header';
import Footer from './Componets/Footer/Footer';
import WebFont from 'webfontloader';
import ProductDetails from './Componets/ProductDetails/ProductDetails';
import Products from './Componets/Products/Products';
import AllComponetWrape from './Componets/AllComponetWrape/AllComponetWrape';
import SearchOverlayPage from './Componets/SearchResult/SearchOverlayPage';
import AuthForm from './Componets/Authentication/Authentication';

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      
      <Routes>
        <Route path="/" element={<AllComponetWrape />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<SearchOverlayPage />} />
        <Route path="/login" element={<AuthForm />} />
      </Routes>
      
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
