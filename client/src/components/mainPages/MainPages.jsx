import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./util/not_found/NotFound";
import DetailProduct from "./detailProduct/DetailProduct";
import { GlobalState } from "../../globleState";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";

const MainPages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserApi.isLogged;
  const [isAdmin] = state.UserApi.isAdmin;
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route path="/cart" exact component={Cart} />
      <Route
        path="/history"
        exact
        component={!isLogged ? NotFound : OrderHistory}
      />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : NotFound}
      />
      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      />

      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default MainPages;

// 5.45.27
