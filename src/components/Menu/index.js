import React from "react";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";

// Firebase
import firebase from "firebase/app";

import "./Menu.scss";
import "./Motion.scss";

import pawIcon from "../../assets/images/paw-icon-outline.svg";

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
        <li className="item">
          Meu pet
          <img src={pawIcon} className="anticon" />
        </li>
        <li className="item" onClick={() => to("/my-posts")}>
          Meus posts
          <Icon type="environment" />
        </li>
        <li className="item">
          Perfil
          <Icon type="profile" />
        </li>
        <li className="item">
          Ajustes
          <Icon type="setting" />
        </li>
        <li className="item" onClick={logout}>
          <Icon type="logout" />
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
