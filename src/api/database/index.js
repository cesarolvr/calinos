// Firebase
import firebase from "firebase/app";

const isUserInDatabase = () =>
  new Promise((resolve, reject) => {
    const databaseInstance = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    databaseInstance
      .collection("users")
      .where("authId", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) resolve(snapshot.data());
        });
      })
      .catch(reject);
  });

const getPosts = () =>
  new Promise((resolve, reject) => {
    // TODO: transferir isso para um service onde todo mundo importa de lá
    const databaseInstance = firebase.firestore();
    databaseInstance
      .collection("posts")
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        resolve(querySnapshot.docs.map(doc => doc.data()));
      })
      .catch(reject);
  });

export { isUserInDatabase, getPosts };
