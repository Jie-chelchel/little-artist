import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import axios from "axios";
import {
  dispatchGetAllUsers,
  fetchAllUser,
} from "../../../redux/actions/usersActions";

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
  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const dispatch = useDispatch();
  const { name, email, password, cf_password, err, success } = data;

  useEffect(() => {
    if (isAdmin) {
      fetchAllUser(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

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
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>

                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === 1 ? (
                          <i className="fa fa-check" title="Admin"></i>
                        ) : (
                          <i className="fas fa-times" title="user"></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/edit_user/${user._id}`}>
                          <i className="fa fa-edit" title="Edit"></i>
                        </Link>
                        <i className="fa fa-trash-alt" title="Remove"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
