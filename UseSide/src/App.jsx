import React from 'react'
import Header from './Componets/Header/Header'
import WebFont from 'webfontloader'
import Footer from './Componets/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './Componets/ProductDetails/ProductDetails'
import Products from './Componets/Products/Products'
import AllComponetWrape from './Componets/AllComponetWrape/AllComponetWrape'
import SearchOverlayPage from './Componets/SearchResult/SearchOverlayPage';



export default function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
      active: () => console.log("Fonts loaded successfully"),
      inactive: () => console.error("Font loading failed"),
    });
  }, []);


  return (
    <>
      {/* <ToastContainer /> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<AllComponetWrape />} />
          <Route path='/productDetails/:id' element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<SearchOverlayPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}
