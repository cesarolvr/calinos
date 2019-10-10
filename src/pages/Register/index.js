import React from "react";
import { Formik } from "formik";
import * as R from "ramda";
import { Link } from "react-router-dom";

// Firebase
import firebase from "firebase/app";

// Style
import "./Register.scss";

// Components
import Logo from "../../components/Logo";

const Register = props => {
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
        query.get().then(querySnapshot => {
          if (querySnapshot.empty) {
            db.collection("users")
              .add({
                email: user.email,
                authId: user.uid,
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
    <div className="page register">
      <Logo />
      <Formik
        initialValues={{ email: "", password: "", name:"" }}
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
          isSubmitting
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
                {errors.name && touched.name && errors.name}
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
                {errors.email && touched.email && errors.email}
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
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <button className="button" type="submit" disabled={isSubmitting}>
              Criar conta
            </button>
            <button className="button -secondary" type="button">
              Criar com Google
            </button>
          </form>
        )}
      </Formik>

      <p className="register">
        Já tem uma conta?
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
