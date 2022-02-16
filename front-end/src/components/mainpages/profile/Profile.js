import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import axios from "axios";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const { name, email, password, cf_password, err, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      const file = e.target.files[0];
      if (!file)
        return setData({ ...data, err: "No files were uploaded", success: "" });

      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: "File size is too large", success: "" });
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return setData({
          ...data,
          err: "File format has to be .jpeg or .png.",
          success: "",
        });
      }

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfo = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        { headers: { Authorization: token } }
      );
      setData({
        ...data,
        err: "",
        success: "Your profile has been updated successfully!",
      });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
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
      axios.post(
        "/user/reset",
        {
          password,
        },
        { headers: { Authorization: token } }
      );
      setData({
        ...data,
        err: "",
        success: "Your password has been updated successfully!",
      });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfo();
    if (password) updatePassword();
  };

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <i className="fa fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">New Password</label>
            <input
              type="password"
              name="password"
              id="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              value={cf_password}
              onChange={handleChange}
            />
          </div>
          <div>
            <em style={{ color: "crimson" }}>
              * if you update your password here, you will not be able to login
              using google and facebook.
            </em>
          </div>
          <button disabled={loading} onClick={handleUpdate}>
            Update
          </button>
        </div>
        <div className="col-right">
          <h2>{isAdmin ? "Users" : "My orders"}</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thread>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thread>
              <tbody>
                <td>Id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Admin</td>
                <td>Action</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
