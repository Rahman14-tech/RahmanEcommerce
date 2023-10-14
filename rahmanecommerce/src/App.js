import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import DisplayCart from "./features/cart/displayCart";
import React, { useState, useEffect } from "react";
import Products from "./pages/Products";
import { getProducts, topThree } from "./features/products/products";
import { useDispatch, useSelector } from "react-redux";
import ProductDetail from "./pages/productDetail";
import { assignUser } from "./features/cart/user";
export const WidthContext = React.createContext();

function App() {
  const { isLoading, productItems } = useSelector((store) => store.products);
  const [windowWidth, widthHandler] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const checkWidth = () => {
    widthHandler(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    dispatch(getProducts());
    const tempUserData = JSON.parse(localStorage.getItem("USER_SESSION"));
    if (tempUserData !== null) {
      dispatch(assignUser(tempUserData));
      console.log(tempUserData);
    }
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log(productItems);
  return (
    <WidthContext.Provider value={{ windowWidth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home></Home>} />
            <Route path="About" element={<About />} />
            <Route path="Products" element={<Products></Products>} />
            <Route path="User" element={<Login></Login>}></Route>
            <Route
              path="Product/:id"
              element={<ProductDetail></ProductDetail>}
            ></Route>
            <Route path="/cart" element={<DisplayCart></DisplayCart>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </WidthContext.Provider>
  );
}

export default App;
