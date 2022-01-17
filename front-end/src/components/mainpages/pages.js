import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Products from "./products/Products";
import { Routes, Route } from "react-router-dom";
import NotFound from "./utils/notFound/Notfound";

function MainPages() {
  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/cart" exact element={<Cart />} />

      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
}

export default MainPages;
