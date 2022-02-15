import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import menu from "./icon/menu.svg";
import cart from "./icon/cart.svg";
import close from "./icon/close.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.auth);
  const { user, isLoggedIn } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avata">
          <img src={user.avatar} alt="user avatar" /> {user.name}
          <i className="fas fa-angle-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLoggedIn ? "translateY(-8px)" : 0,
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Little Artists</Link>
        </h1>
      </div>
      <ul style={transForm}>
        <li>
          <Link to="/">Products</Link>
        </li>

        {isLoggedIn ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">Login/Sign up </Link>
          </li>
        )}

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
