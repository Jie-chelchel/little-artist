import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};
function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password, err, success } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("user/login", {
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={loginSubmit}>
        <div>
          <label htmlFor="email"> Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            id="email"
            onChange={onChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            value={password}
            required
            id="password"
            onChange={onChangeInput}
          />
        </div>
        <div className="btns">
          <button type="submit">Login</button>
          <Link to="/forgot_password"> Forgot your password?</Link>
        </div>
      </form>

      <p>
        New Customer? <Link to="/register">Register</Link>{" "}
      </p>
    </div>
  );
}

export default Login;
