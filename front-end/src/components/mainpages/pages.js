import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";

import { Switch, Route } from "react-router-dom";
import NotFound from "./utils/notFound/Notfound";
import ActivationEmail from "./auth/ActivationEmail";
import { useSelector } from "react-redux";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";

function MainPages() {
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, isAdmin } = auth;
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
      <Route path="/user/reset/:token" exact component={ResetPassword} />
      <Route path="/profile" exact component={Profile} />
      <Route
        path="/edit_user/:id"
        exact
        component={isAdmin ? EditUser : NotFound}
      />

      {/* <Route path="/" exact component={Products} /> */}
      {/* <Route path="/productdetail/:id" exact component={ProductDetail} /> */}

      {/* <Route path="/cart" exact component={Cart} /> */}

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default MainPages;
