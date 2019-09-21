// Firebase
import firebase from "firebase/app";

const isUserInDatabase = () =>
  new Promise((resolve, reject) => {
    const databaseInstance = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    databaseInstance
      .collection("users")
      .where("id", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) resolve(snapshot.data());
        });
      })
      .catch(reject);
  });

export { isUserInDatabase };
