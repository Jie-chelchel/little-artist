import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import menu from "./icon/menu.svg";
import cart from "./icon/cart.svg";
import close from "./icon/close.svg";
import { Link } from "react-router-dom";

function Header() {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className="menu">
        <img src={menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">Little Artists</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>{" "}
        <li>
          <Link to="/login">Login </Link>
        </li>
        <li>
          <Link to="/register">Register </Link>
        </li>
        <li>
          <img src={close} alt="" width={"30"} className="menu" />
        </li>
      </ul>
      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={cart} alt="" width="30" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
