import { Route, Redirect } from "react-router-dom";
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
import Publication from "../pages/Publication";
import Chat from "../pages/Chat";
import MyPosts from "../pages/MyPosts";
import NotFound from "../pages/NotFound";

// TODO: reimplementar o TransitionGroup nas rotas. Passar a usar keys ao invés de in
const OwnRoute = ({ component: Component, authed, path, ...rest }) => {
  return (
    <Route {...rest} key={path} path={path}>
      {({ match, location, ...props }) => {
        console.log(location);
        
        return (
          <CSSTransition
            in={match != null}
            timeout={100}
            classNames="page"
            unmountOnExit
            mountOnEnter
            appear
          >
            {authed ? (
              <Redirect to={{ pathname: "/inicio" }} />
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
              <Redirect to={{ pathname: "/entrar" }} />
            )}
          </CSSTransition>
        );
      }}
    </Route>
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
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
            <Component {...props} {...rest} />
          </CSSTransition>
        );
      }}
    </Route>
  );
};

const Routes = () => {
  return (
    <FirebaseAuthConsumer>
      {firebaseProps => {
        return (
          <Fragment>
            {/* <Switch> */}
            <PublicRoute
              exact
              path="/publicacao/:id"
              component={Publication}
            />
            <OwnRoute
              exact
              path="/entrar"
              authed={isAuthed(firebaseProps)}
              component={Login}
              firebaseprops={firebaseProps}
            />
            <OwnRoute
              exact
              path="/registro"
              authed={isAuthed(firebaseProps)}
              component={Register}
              firebaseprops={firebaseProps}
            />
            <PrivatedRoute
              exact
              path="/inicio"
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
              path="/publicar"
              authed={isAuthed(firebaseProps)}
              component={Post}
            />

            <PrivatedRoute
              exact
              path="/chat/:id"
              authed={isAuthed(firebaseProps)}
              component={Chat}
            />
            <PrivatedRoute
              exact
              path="/minhas-publicacoes"
              authed={isAuthed(firebaseProps)}
              component={MyPosts}
            />
            <OwnRoute path="/nao-encontrado" exact={true} component={NotFound} />
          </Fragment>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default Routes;
