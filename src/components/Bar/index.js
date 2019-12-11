import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import PawIcon from "../../components/Icons/Paw";
import AdoptIcon from "../../components/Icons/Adopt";
import HeartIcon from "../../components/Icons/Heart";
import StoreIcon from "../../components/Icons/Store";

import "./Bar.scss";

const Bar = ({ fixed, location }) => {
  console.log(location.pathname);
  
  const isRouteActive = routename => location.pathname === routename;

  return (
    <div
      className={classNames("bar", {
        "-fixed": fixed
      })}
    >
      <ul className="bar-list">
        <Link
          className={classNames("item link paw", {
            "-active": isRouteActive("/inicio")
          })}
          to="/inicio"
        >
          <PawIcon />
        </Link>
        <Link
          className={classNames("item link heart", {
            "-active": isRouteActive("/feed")
          })}
          to="/feed"
        >
          <HeartIcon />
        </Link>
        <Link
          className={classNames("item link adopt", {
            "-active": isRouteActive("/adotar")
          })}
          to="/adotar"
        >
          <AdoptIcon />
        </Link>
        <Link
          className={classNames("item link store", {
            "-active": isRouteActive("/loja")
          })}
          to="/loja"
        >
          <StoreIcon />
        </Link>
      </ul>
    </div>
  );
};

export default withRouter(Bar);
