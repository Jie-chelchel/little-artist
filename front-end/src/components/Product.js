import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = () => {
  return (
    <div className="product">
      <img
        src="https://images.unsplash.com/photo-1641304266009-404efd34d401?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        alt="paint"
      />
      <div className="product__info">
        <p className="info__name">picture 1</p>
        <p className="info__description">
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
          ipsumLorem ipsumLorem ipsum{" "}
        </p>
        <p className="info__price">$19.99</p>
        <Link to={`/products/${111}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
