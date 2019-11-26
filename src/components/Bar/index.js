import React from "react";
import classNames from 'classnames'

import { Link } from "react-router-dom";

import "./Bar.scss";

const Bar = ({ fixed }) => (
  <div className={classNames("bar", {
    '-fixed' : fixed
  })}>
    <ul className="bar-list">
      <Link className="item link paw" to="/home"></Link>
      {/* <Link className="item link" to="/feed"></Link> */}
      <li className="item" />
      <li className="item" />
      <li className="item" />
    </ul>
  </div>
);

export default Bar;
