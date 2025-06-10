import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Componets/Header/Header'
import WebFont from 'webfontloader'
// import { Routes } from 'react-router'
import Footer from './Componets/Footer/Footer'
import ProductCard from './Componets/ProductCard/ProductCard'
import Banner from './Componets/Banner/Banner'



export default function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])


  return (
    <>
        <Header />
        <Banner />
        <ProductCard />
        <Footer />
      {/* <Routes>
      </Routes> */}
    </>
  )
}
