import React, { useEffect } from "react";
import { notification } from "antd";
import { Formik } from "formik";
import { withRouter } from "react-router";
import * as R from "ramda";
import classNames from "classnames";

// Firebase
import firebase from "firebase/app";

import Page from "../Page";

import { useStateValue } from "../../state";

// Style
import "./Register.scss";
import "./RegisterAnimation.scss";

const Register = ({ history, ...props }) => {
  const [_, dispatch] = useStateValue();
  const reallyDisconnected = R.path(
    ["firebaseprops", "firebase", "auth"],
    props
  );

  useEffect(() => {
    dispatch({
      type: "setRegisterSelected",
      registerSelected: true
    });

    return () => {
      dispatch({
        type: "setRegisterSelected",
        registerSelected: false
      });
    }
  }, [])

  // TODO: transferir signup para um lugar equivalente ao lugar do signIn em /auth
  const signUp = ({ name, email, password }) => {
    dispatch({
      type: "setIsLoading",
      isLoading: true
    });
    const db = firebase.firestore();
    const citiesRef = db.collection("users");
    const query = citiesRef.where("email", "==", email);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: name,
        })
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
                dispatch({
                  type: "setIsLoading",
                  isLoading: false
                });
                console.log("User registered with ID: ", docRef.id);
              })
              .catch(error => {
                dispatch({
                  type: "setIsLoading",
                  isLoading: false
                });
                console.error("Error on register user: ", error);
              });
          } else {
            dispatch({
              type: "setIsLoading",
              isLoading: false
            });
          }
        });
      })
      .catch(err => {
        console.log(err);

        const { message = "Erro ao fazer login" } = err
        notification.error({
          message,
          duration: 4
        });
        dispatch({
          type: "setIsLoading",
          isLoading: false
        });
      });
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
              history.push('/entrar');
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
