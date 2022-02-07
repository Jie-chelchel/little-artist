import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill in all fields",
        success: "",
      });
    if (!isEmail(email))
      return setUser({
        ...user,
        err: "Invalid emails",
        success: "",
      });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password should be at least 6 characters",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Password did not match",
        success: "",
      });

    try {
      // const res = await axios.post("http://localhost:8000/user/register", {
      //   email,
      //   password,
      // });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-page">
      <h2>Register</h2>

      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> Username</label>
          <input
            type="name"
            name="name"
            value={name}
            id="name"
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="email"> Email Address</label>
          <input
            // type="email"
            name="email"
            value={email}
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
            id="password"
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="cf_password"> Confirm Password</label>
          <input
            type="password"
            name="cf_password"
            value={cf_password}
            id="cf_password"
            onChange={onChangeInput}
          />
        </div>
        <div className="btns">
          <button type="submit">Register</button>
        </div>
      </form>

      <p>
        Already has an account? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
}

export default Register;
