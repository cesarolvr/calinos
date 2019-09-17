import { Route, Redirect } from "react-router-dom";
import React, { Fragment } from "react";

// Firebase
import { FirebaseAuthConsumer } from "@react-firebase/auth";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";

const Routes = () => (
  <FirebaseAuthConsumer>
    {firebaseProps => (
      <Fragment>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Login} />
        <PrivatedRoute
          exact
          path="/"
          authed={firebaseProps.isSignedIn}
          component={Home}
        />
      </Fragment>
    )}
  </FirebaseAuthConsumer>
);

const PrivatedRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default Routes;
