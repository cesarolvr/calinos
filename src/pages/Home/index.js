import React from "react";

// Firebase
import firebase from "firebase/app";

const Home = () => {
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
