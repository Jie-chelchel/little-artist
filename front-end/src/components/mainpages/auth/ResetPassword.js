import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isLength, isMatch } from "../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Password did not match",
        success: "",
      });

    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="fg_pass">
      <h2>Reset Your Password</h2>

      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="password">Enter a new password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />
        <label htmlFor="cf_password">confirm your password</label>
        <input
          type="password"
          name="cf_password"
          id="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
        />
        <button onClick={handleResetPassword}>Rest Password</button>
      </div>
    </div>
  );
}

export default ResetPassword;
