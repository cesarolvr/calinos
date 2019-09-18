import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./components/App";

// Styles
import "./styles/base.css";

// Firebase
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Consts
import { firebaseConfig } from "./consts";

ReactDOM.render(
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <FirebaseAuthConsumer>
      {firebaseProps => <App firebaseprops={firebaseProps} />}
    </FirebaseAuthConsumer>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);
