import React from "react";
import classNames from 'classnames'

import { Link } from "react-router-dom";

import "./Bar.scss";

const Bar = ({ fixed }) => (
  <div className={classNames("bar", {
    '-fixed' : fixed
  })}>
    <ul className="bar-list">
      <Link className="item link paw" to="/inicio"></Link>
      {/* <Link className="item link" to="/feed"></Link> */}
      <Link className="item link heart" to="/feed" />
      <Link className="item link adopt" to="/adotar" />
      <Link className="item link store" to="/loja" />
    </ul>
  </div>
);

export default Bar;
