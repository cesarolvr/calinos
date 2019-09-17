import { Route, Redirect, Switch } from "react-router-dom";
import React, { Fragment } from "react";

// Firebase
import { FirebaseAuthConsumer } from "@react-firebase/auth";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const Routes = () => (
  <FirebaseAuthConsumer>
    {firebaseProps => (
      <Fragment>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Login} />
          <PrivatedRoute
            exact
            path="/home"
            authed={firebaseProps.isSignedIn}
            component={Home}
          />
          <Route path="/not-found" exact={true} component={NotFound} />
          <Redirect from='*' to='/not-found' />
        </Switch>
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
