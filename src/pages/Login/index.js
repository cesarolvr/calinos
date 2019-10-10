import React from "react";
import { Formik } from "formik";
import * as R from "ramda";
import { Link } from "react-router-dom";

// Firebase
import firebase from "firebase/app";

// Api
import { signIn, signInGoogle } from "../../api/auth/login";

// Styles
import "./Login.scss";

// Components
import Logo from "../../components/Logo";

const Login = props => {
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
  const signInWithGoogle = () => {
    signInGoogle()
      .then(result => {
        const { user } = result;
        const citiesRef = db.collection("users");
        const query = citiesRef.where("email", "==", user.email);
        query.get().then(querySnapshot => {
          if (querySnapshot.empty) {
            db.collection("users")
              .add({
                email: user.email,
                id: user.uid,
                name: user.displayName
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
      .catch(error => {
        console.log(error);
      });
  };
  if (!reallyDisconnected) return null;
  return (
    <div className="page login">
      <Logo />
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
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
          isSubmitting
          /* and other goodies */
        }) => (
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
              </div>
              {errors.email && touched.email && errors.email}
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
              </div>
            </div>
            {errors.password && touched.password && errors.password}
            <button className="button" type="submit" disabled={isSubmitting}>
              Entrar
            </button>
            <button
              type="button"
              className="button -secondary"
              onClick={signInWithGoogle}
            >
              Entrar com Google
            </button>
          </form>
        )}
      </Formik>

      <p className="register">
        Não tem uma conta?
        <Link className="link" to="/register">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default Login;
