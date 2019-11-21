import { notification } from "antd";

// Firebase
import firebase from "firebase/app";

const signIn = ({ email, password }) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userLogged => {
        resolve(userLogged);
      })
      .catch((err) => {
        const { message = "Erro ao fazer login" } = err
        notification.error({
          message,
          duration: 999999
        });
        reject(err);
      });
  });

export { signIn };
