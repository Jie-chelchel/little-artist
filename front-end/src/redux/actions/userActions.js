import * as actionTypes from "../constants/authConstants";
import axios from "axios";
export const dispatchLogin = () => {
  return {
    type: actionTypes.LOGIN,
  };
};

export const fetchUser = async (token) => {
  const res = await axios.get("/user/info", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetUser = async (res) => {
  return {
    type: actionTypes.GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};
