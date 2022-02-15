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
  return (
    <div className="profile_page">
      <div className="col-left">
        <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
        <div className="avatar">
          <img src={avatar ? avatar : user.avatar} alt="" />
          <span>
            <i className="fa fa-camera"></i>
            <p>Change</p>
            <input type="file" name="file" id="file_up" />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" defaultValue={user.name} />
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
            name="Password"
            id="Password"
            value={password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cf_password">Confirm New Password</label>
          <input
            type="password"
            name="cf_password"
            id="cf_password"
            value={cf_password}
          />
        </div>
        <button disabled={loading}> Update</button>
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
  );
}

export default Profile;
