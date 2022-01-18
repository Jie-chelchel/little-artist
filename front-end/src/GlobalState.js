import React, { createContext, useState } from "react";
import ProductsApi from "./api/ProductsApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  ProductsApi();
  return (
    <GlobalState.Provider value={"Value"}>{children}</GlobalState.Provider>
  );
};
