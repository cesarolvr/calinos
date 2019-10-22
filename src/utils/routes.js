import { Route, Redirect, Switch } from "react-router-dom";
import React, { Fragment } from "react";
import { CSSTransition } from "react-transition-group";

// Firebase
import { FirebaseAuthConsumer } from "@react-firebase/auth";

import { isAuthed } from "../utils/auth";

// Pages
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Post from "../pages/Post";
import Chat from "../pages/Chat";
import MyPosts from "../pages/MyPosts";
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    <FirebaseAuthConsumer>
      {firebaseProps => {
        return (
          <Fragment>
            {/* <Switch> */}
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
            <PrivatedRoute
              exact
              path="/"
              authed={isAuthed(firebaseProps)}
              component={Home}
            />
            <PrivatedRoute
              exact
              path="/feed"
              authed={isAuthed(firebaseProps)}
              component={Feed}
            />
            <PrivatedRoute
              exact
              path="/post"
              authed={isAuthed(firebaseProps)}
              component={Post}
            />
            <PrivatedRoute
              exact
              path="/chat"
              authed={isAuthed(firebaseProps)}
              component={Chat}
            />
            <PrivatedRoute
              exact
              path="/my-posts"
              authed={isAuthed(firebaseProps)}
              component={MyPosts}
            />
            <OwnRoute path="/not-found" exact={true} component={NotFound} />
            <Redirect from="*" to="/home" />
            {/* </Switch> */}
          </Fragment>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

const OwnRoute = ({ component: Component, authed, path, ...rest }) => {
  return (
    <Route {...rest} key={path} path={path}>
      {({ match, ...props }) => {
        return (
          <CSSTransition
            in={match != null}
            timeout={100}
            classNames="page"
            unmountOnExit
          >
            {authed ? (
              <Redirect to={{ pathname: "/home" }} />
            ) : (
              <Component {...props} {...rest} />
            )}
          </CSSTransition>
        );
      }}
    </Route>
  );
};

const PrivatedRoute = ({ component: Component, authed, ...rest }) => {
  console.log('PrivatedRoute');
  return (
    <Route {...rest}>
      {({ match, ...props }) => {
        return (
          <CSSTransition
            in={match != null}
            timeout={100}
            classNames="page"
            unmountOnExit
          >
            {authed ? (
              <Component {...props} {...rest} />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )}
          </CSSTransition>
        );
      }}
    </Route>
  );
};

export default Routes;
