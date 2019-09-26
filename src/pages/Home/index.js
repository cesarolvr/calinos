import React, { useState } from "react";
import classNames from "classnames";

// Components
import Map from "../../components/Map";

// Firebase
import firebase from "firebase/app";

import logo from "../../assets/images/logo-lettering.svg";

import "./Home.scss";
import "./Bar.scss";
import "./Menu.scss";

const Home = () => {
  const [menuOpened, setMenuOpened] = useState(true);
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <div
      className={classNames("home", {
        "-opened": menuOpened
      })}
    >
      <div
        className={classNames("menu", {
          "-opened": menuOpened
        })}
      >
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="nav-list">
          <li className="item">Procurar meu pet</li>
          <li className="item">Mensagens</li>
          <li className="item">Perfil</li>
          <li className="item">Ajustes</li>
          <li className="item">Sair</li>
        </ul>
        <div className="profile">
          <img src="" alt="" className="photo" />
          <p className="name">Cesar</p>
          <div className="description">Dono do vinil</div>
        </div>
      </div>
      <div className="map">
        <div
          className="menu-toggle"
          onClick={() => setMenuOpened(!menuOpened)}
        />
        <div className="bar">
          <button onClick={logout}>Logout</button>
        </div>
        <Map />
      </div>
    </div>
  );
};

export default Home;
