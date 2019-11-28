import React from "react";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";

// Firebase
import firebase from "firebase/app";

import "./Menu.scss";
import "./Motion.scss";

import pawIcon from "../../assets/images/paw-icon-outline.svg";

const Menu = ({ history, toggleMenu }) => {
  const currentUser = firebase.auth().currentUser;
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
          <span className="-disabled">Meu pet</span>
          <img src={pawIcon} className="anticon  -disabled" />
        </li>
        <li className="item" onClick={() => to("/my-posts")}>
          <span>Meus posts</span>
          <Icon type="environment" className="-disabled" />
        </li>
        <li className="item">
          <span className="-disabled">Perfil</span>
          <Icon type="profile" className="-disabled" />
        </li>
        <li className="item">
          <span className="-disabled">Ajustes</span>
          <Icon type="setting" className="-disabled" />
        </li>
        <li className="item" onClick={logout}>
          <Icon type="logout" />
          Sair
        </li>
      </ul>
      <div className="profile">
        <img src="" alt="" className="photo" />
        <div className="info">
          <p className="name">
            {currentUser && currentUser.displayName && currentUser.displayName.split(" ")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
