import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";

import { Switch, Route } from "react-router-dom";
import NotFound from "./utils/notFound/Notfound";
import ActivationEmail from "./auth/ActivationEmail";
import { useSelector } from "react-redux";
import ForgotPassword from "./auth/ForgotPassword";

function MainPages() {
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;
  return (
    <Switch>
      <Route path="/login" exact component={isLoggedIn ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLoggedIn ? NotFound : Register}
      />
      <Route
        path="/user/activate/:activation_token"
        exact
        component={ActivationEmail}
      />
      <Route path="/forgot_password" exact component={ForgotPassword} />

      {/* <Route path="/" exact component={Products} /> */}
      {/* <Route path="/productdetail/:id" exact component={ProductDetail} /> */}

      {/* <Route path="/cart" exact component={Cart} /> */}

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default MainPages;
