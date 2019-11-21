import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router";
import * as R from "ramda";
import classNames from "classnames";

// Firebase
import firebase from "firebase/app";

import Page from "../Page";

// Style
import "./Register.scss";
import "./Motion.scss";

const Register = ({ history, ...props }) => {
  // const [{ aplicationLoaded }, dispatch] = useStateValue();
  const reallyDisconnected = R.path(
    ["firebaseprops", "firebase", "auth"],
    props
  );
  const signUp = ({ name, email, password }) => {
    const db = firebase.firestore();
    const citiesRef = db.collection("users");
    const query = citiesRef.where("email", "==", email);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // TODO: abstrair essas chamadas no DB
        query.get().then(querySnapshot => {
          if (querySnapshot.empty) {
            db.collection("users")
              .add({
                email: user.email,
                id: user.uid,
                name
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
  if (!reallyDisconnected) return null;
  return (
    <Page name="register">
      <div className="banner">
        <h1 className="title">
          Crie uma <br /> conta
        </h1>
        <p className="register">
          <a
            className="link"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </a>
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Obrigatório";
          }
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
          const { name, email, password } = values;

          signUp({
            name,
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
        }) => (
          <form className="form" onSubmit={handleSubmit}>
            <div className="box">
              <div className="input-wrapper">
                <label className="label">Nome</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="João Silva"
                />
                {errors.name && touched.name && errors.name && (
                  <span className="error">
                    {errors.name && touched.name && errors.name}
                  </span>
                )}
              </div>
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
              Criar conta
            </button>
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default withRouter(Register);
