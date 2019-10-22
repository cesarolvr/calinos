import React from "react";
import { Formik } from "formik";
import classNames from "classnames";
import * as R from "ramda";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import Page from "../Page";

// Firebase
import firebase from "firebase/app";

// Api
import { signIn } from "../../api/auth/login";

import { useStateValue } from "../../state";

// Styles
import "./Login.scss";

import logo from "../../assets/images/logo-icon.svg";
import illustrationPeople from "../../assets/images/login-illustration-content.svg";
import illustrationAmbient from "../../assets/images/login-illustration.svg";
import logoLoading from "../../assets/images/logo-full.svg";

const Login = props => {
  const [{ aplicationLoaded }, dispatch] = useStateValue();
  const db = firebase.firestore();
  const reallyDisconnected = R.path(
    ["firebaseprops", "firebase", "auth"],
    props
  );

  const signInWithEmailPassword = ({ email, password }) => {
    signIn({ email, password })
      .then(({ user }) => {
        const usersRef = db.collection("users");
        const query = usersRef.where("email", "==", email);
        query.get().then(querySnapshot => {
          if (querySnapshot.empty) {
            db.collection("users")
              .add({
                email: email,
                id: user.uid,
                name: "Usuário"
              })
              .then(docRef => {
                console.log("User registered with ID: ", docRef.id);
              })
              .catch(error => {
                console.error("Error on register user: ", error);
              });
          }
        });
      })
      .catch(err => console.log(err));
  };
  const toggleLoad = () => {
    dispatch({
      type: "setAplicationLoaded",
      aplicationLoaded: !aplicationLoaded
    });
  };
  if (!reallyDisconnected) return null;
  return (
    <Page name="login">
      <div className="logo-loading">
        <img src={logoLoading} alt="" />
      </div>
      <div className="banner">
        <div className="ambient">
          <img src={illustrationAmbient} alt="" />
        </div>
        <div className="people" onClick={toggleLoad}>
          <img src={illustrationPeople} alt="" />
        </div>
        <img src={logo} className="logo" alt="" />
        <p className="register">
          <Link key="/register" as={NavLink} className="link" to="/register">
            Cadastre-se
          </Link>
          {/* <Link className="link" to="/register">
            Cadastre-se
          </Link> */}
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          let errors = {};
          if (!values.password) {
            errors.password = "Obrigatório";
          }
          if (!values.email) {
            errors.email = "Obrigatório";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email inválido";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password } = values;

          signInWithEmailPassword({
            email,
            password
          });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid
        }) => {
          return (
            <form className="form" onSubmit={handleSubmit}>
              <div className="box">
                <div className="input-wrapper">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email@example.com"
                  />
                  {errors.email && touched.email && errors.email && (
                    <span className="error">
                      {errors.email && touched.email && errors.email}
                    </span>
                  )}
                </div>

                <div className="input-wrapper">
                  <label className="label">Senha</label>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="*********"
                  />
                  {errors.password && touched.password && errors.password && (
                    <span className="error">
                      {errors.password && touched.password && errors.password}
                    </span>
                  )}
                </div>
              </div>
              <button
                className={classNames("button", {
                  "-disabled": !isValid
                })}
                type="submit"
              >
                Entrar
              </button>
            </form>
          );
        }}
      </Formik>
    </Page>
  );
};

export default Login;
