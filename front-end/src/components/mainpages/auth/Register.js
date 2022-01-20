import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={registerSubmit}>
        <input
          type="name"
          name="name"
          placeholder="name"
          value={user.name}
          required
          onChange={onChangeInput}
        />
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
          <button type="submit">register</button>
          <Link to="/login"> Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
