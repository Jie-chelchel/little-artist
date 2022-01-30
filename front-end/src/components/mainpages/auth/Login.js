import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  let history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/user/login", {
        ...user,
      });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={user.email}
          required
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          required
          onChange={onChangeInput}
        />
        <div className="btns">
          <button type="submit">Login</button>
          <Link to="/register"> Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
