import * as actionTypes from "../constants/authConstants";
import axios from "axios";

export const fetchAllUser = async (token) => {
  const res = await axios.get("/user/all_info", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllUsers = (res) => {
  return {
    type: actionTypes.GET_ALL_USERS,
    payload: res.data,
  };
};
