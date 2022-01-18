import React from "react";
import "./ProductPage.css";
const ProductPage = () => {
  return (
    <div className="productscreen">
      <div className="productscreen__left">
        <div className="left__image">
          <img
            src="https://images.unsplash.com/photo-1641304266009-404efd34d401?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="paint name"
          />
        </div>
        <div className="left__info">
          <p className="left__name">Picture 1</p>
          <p className="left__name">Price: $19.99</p>
          <p>
            Description: ipsumLorem
            ipsumLoremipsumLoremipsumLoremipsumLoremipsumLorem{" "}
          </p>
        </div>
      </div>
      <div className="productscreen__right">
        <div className="right__info">
          <p>
            Price: <span>$19.99</span>
          </p>
          <p>
            Status: <span>In Stock</span>
          </p>
          <p>
            Qty:{" "}
            <select>
              <option value="1">1</option>
            </select>
          </p>
          <p>
            <button type="button">Add To Cart</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
