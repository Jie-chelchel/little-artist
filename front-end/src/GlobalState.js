import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ProductsApi from "./api/ProductsApi";
import UserAPI from "./api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    // token: [token, setToken],
    productsApi: ProductsApi(),
    userAPI: UserAPI,
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
