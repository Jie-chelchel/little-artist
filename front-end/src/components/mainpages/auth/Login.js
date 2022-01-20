import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
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
        <div>
          <button type="submit">Login</button>
          <Link to="/register"> Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
