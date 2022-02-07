import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ProductsApi from "./api/ProductsApi";
import UserAPI from "./api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  // const refreshToken = async () => {
  //   const token = await axios.get("http://localhost:8000/user/refresh_token");
  //   console.log(token);
  // };

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  const state = {
    // token: [token, setToken],
    productsApi: ProductsApi(),
    userAPI: UserAPI,
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
