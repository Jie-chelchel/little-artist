import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Products from "./products/Products";
import { Switch, Route } from "react-router-dom";
import NotFound from "./utils/notFound/Notfound";
import ProductDetail from "./productDetail/ProductDetail";
import ActivationEmail from "./auth/ActivationEmail";

function MainPages() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route
        path="/user/activate/:activation_token"
        exact
        component={ActivationEmail}
      />

      <Route path="/" exact component={Products} />
      <Route path="/productdetail/:id" exact component={ProductDetail} />

      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default MainPages;
