import React from "react";
import { Formik } from "formik";
import R from "ramda";

// Firebase
import firebase from "firebase/app";

const Register = props => {
  const reallyDisconnected = R.path(
    ["firebaseprops", "firebase", "auth"],
    props
  );
  const signUp = ({ email, password }) => {
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
                followers: [],
                id: user.uid,
                markers: [],
                nome: "teste"
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
    <div>
      Register
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

          signUp({
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
              Register
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
