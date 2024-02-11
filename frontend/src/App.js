import './App.css';
import {React, useEffect, useState} from "react"
import Header from "./component/layout/Header/Header"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/footer";
import Home from "./component/Home/home"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/products.js"
import Search from "./component/Product/search.js"

function App() {
  useEffect(() => {
    WebFont.load({google: {
      families: ["Roboto", "Droid Sans", "Chilkana"]
    }})
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
