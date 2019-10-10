import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./utils/history";

// Components
import App from "./components/App";

// Styles
import "./styles/base.scss";
import "./styles/default.scss";

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

const initialState = {
  pinOpened: false,
  activeChat: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setPinOpened":
      return {
        ...state,
        pinOpened: action.pinOpened
      };

    case "setMenuOpened":
      return {
        ...state,
        menuOpened: action.menuOpened
      };

      case "setActiveChat":
      return {
        ...state,
        activeChat: action.activeChat
      };

    default:
      return state;
  }
};

ReactDOM.render(
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <FirebaseAuthConsumer>
      {firebaseProps => (
        <Router history={history}>
          <StateProvider initialState={initialState} reducer={reducer}>
            <App firebaseprops={firebaseProps} />
          </StateProvider>
        </Router>
      )}
    </FirebaseAuthConsumer>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);
