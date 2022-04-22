import React, { createContext, useEffect, useState } from "react";
import productsApi from "./api/ProductsApi";
import UserApi from "./api/UserApi";
import CategoriesApi from "./api/CategoriesApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
          setToken(firstLogin);
      };
      refreshToken();
    }
  }, []);
  // console.log(token);
  const state = {
    token: [token, setToken],
    productsApi: productsApi(),
    UserApi :UserApi(token),
    CategoriesApi : CategoriesApi(token)
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
