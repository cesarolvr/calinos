import React from "react";
import { Formik } from "formik";
import R from "ramda";
import { Link } from "react-router-dom";

// Firebase
import firebase from "firebase/app";

// Api
import { signIn, signInGoogle } from "../../api/auth/login";

const Login = props => {
  const db = firebase.firestore();
  const reallyDisconnected = R.path(
    ["firebaseprops", "firebase", "auth"],
    props
  );

  const signInWithEmailPassword = ({ email, password }) => {
    signIn({ email, password })
      .then(userLogged => {
        const usersRef = db.collection("users");
        const query = usersRef.where("email", "==", email);
        query.get().then(querySnapshot => {
          if (querySnapshot.empty) {
            db.collection("users")
              .add({
                email: email,
                followers: [],
                id: userLogged.id,
                markers: [],
                nome: ""
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
                followers: [],
                id: user.uid,
                markers: [],
                nome: user.displayName
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
    <div>
      Login
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
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link to="/register">Register</Link>
      <button type="submit" onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
