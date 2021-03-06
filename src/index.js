import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

// Components
import App from "./components/App";

// Mock
import { favorites, adoption } from './mock'

// Styles
import "./styles/base.scss";
import "./styles/default.scss";
import "antd/dist/antd.css";

// State
import { StateProvider } from "./state";

// Firebase
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

// Consts
import { firebaseConfig } from "./consts";

// TODO: passar esse state para outro canto mais adequado
const initialState = {
  pinOpened: false,
  isLoading: false,
  aplicationLoaded: false,
  loginSelected: false,
  postUploaded: null,
  alert: false,
  isLoading: false,
  favoriteSelected: [],
  favorites,
  adoption,
};

const reducer = (state, action) => {
  // TODO: passar esse reducer para outro lugar
  switch (action.type) {
    case "setPinOpened":
      return {
        ...state,
        pinOpened: action.pinOpened
      };

    case "setFavoriteSelected":
      return {
        ...state,
        favoriteSelected: action.favoriteSelected
      };

    case "setAlert":
      return {
        ...state,
        alert: action.alert
      };

    case "setMenuOpened":
      return {
        ...state,
        menuOpened: action.menuOpened
      };

    case "setAplicationLoaded":
      return {
        ...state,
        aplicationLoaded: action.aplicationLoaded
      };

    case "setLoginSelected":
      return {
        ...state,
        loginSelected: action.loginSelected
      };

    case "setRegisterSelected":
      return {
        ...state,
        registerSelected: action.registerSelected
      };

    case "setIsLoading":
      return {
        ...state,
        isLoading: action.isLoading
      };

    case "setPostUploaded":
      return {
        ...state,
        postUploaded: action.postUploaded
      };

    default:
      return state;
  }
};

ReactDOM.render(
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <FirebaseAuthConsumer>
      {firebaseProps => (
        <Router>
          <HashRouter basename="/">
            <StateProvider initialState={initialState} reducer={reducer}>
              <App firebaseprops={firebaseProps} />
            </StateProvider>
          </HashRouter>
        </Router>
      )}
    </FirebaseAuthConsumer>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);
