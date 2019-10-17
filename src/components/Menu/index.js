import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Firebase
import firebase from "firebase/app";

import logo from "../../assets/images/logo-lettering.svg";

import "./Menu.scss";

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
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-list">
        <li className="item">Procurar meu pet</li>
        <li className="item" onClick={() => to("/messages")}>
          Mensagens
        </li>
        <li className="item">Perfil</li>
        <li className="item">Ajustes</li>
        <li className="item" onClick={logout}>
          Sair
        </li>
      </ul>
      <div className="profile">
        <img src="" alt="" className="photo" />
        <p className="name">Cesar</p>
        <div className="description">Dono do vinil</div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
