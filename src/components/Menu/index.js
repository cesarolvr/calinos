import React from "react";
import { withRouter } from "react-router-dom";

// Firebase
import firebase from "firebase/app";

import "./Menu.scss";
import "./Motion.scss";

const Menu = ({ history, toggleMenu }) => {
  const logout = () => {
    toggleMenu();
    firebase.auth().signOut();
  };

  const to = route => {
    toggleMenu();
    history.push(route);
  };
  return (
    <div className="menu">
      <h1 className="title">Menu</h1>
      <ul className="nav-list">
        <li className="item">Procurar meu pet</li>
        <li className="item" onClick={() => to("/my-posts")}>
          Meus posts
          <span className="notification">3</span>
        </li>
        <li className="item">Perfil</li>
        <li className="item">Ajustes</li>
        <li className="item" onClick={logout}>
          Sair
        </li>
      </ul>
      <div className="profile">
        <img src="" alt="" className="photo" />
        <div className="info">
          <p className="name">Cesar</p>
          <div className="description">Dono do vinil</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
