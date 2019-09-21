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
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

const signInGoogle = () =>
  new Promise((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res =>
        resolve(res).catch(err => {
          console.log(err);
          reject(err);
        })
      );
  });

export { signIn, signInGoogle };
