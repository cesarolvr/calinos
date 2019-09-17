import { Route, Redirect, Switch } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

// Firebase
import { FirebaseAuthConsumer } from "@react-firebase/auth";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const isAuthed = firebaseProps => {
  const { isSignedIn, firebase } = firebaseProps;
  return !!(isSignedIn && firebase.auth);
};

const Routes = () => {
  return (
    <FirebaseAuthConsumer>
      {firebaseProps => {
        return (
          <Fragment>
            <Switch>
              <OwnRoute
                exact
                path="/login"
                authed={isAuthed(firebaseProps)}
                component={Login}
                firebaseprops={firebaseProps}
              />
              <OwnRoute
                exact
                path="/register"
                authed={isAuthed(firebaseProps)}
                component={Register}
                firebaseprops={firebaseProps}
              />
              <PrivatedRoute
                exact
                path="/home"
                authed={isAuthed(firebaseProps)}
                component={Home}
              />
              <Route path="/not-found" exact={true} component={NotFound} />
              <Redirect from="*" to="/not-found" />
            </Switch>
          </Fragment>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

const OwnRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Redirect to={{ pathname: "/home" }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

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
