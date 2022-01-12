import React from "react";
import "./Cart.css";
import CartItem from "../components/CartItem";
const Cart = () => {
  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>Shopping Cart</h2>
        <CartItem />
      </div>
      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p>Subtotal (0) items</p>
          <p>$ 19.99</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
