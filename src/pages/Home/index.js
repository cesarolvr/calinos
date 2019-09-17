import React from "react";

// Components
import Map from '../../components/Map'

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
      <Map />
    </div>
  );
};

export default Home;
