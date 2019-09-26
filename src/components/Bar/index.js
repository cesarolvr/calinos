import React from "react";

import { Link } from "react-router-dom";

import "./Bar.scss";

const Bar = () => (
  <div className="bar">
    <ul className="bar-list">
      <li className="item">
        <Link className="link" to="/home">
          Home
        </Link>
      </li>
      <li className="item">
        <Link className="link" to="/feed">
          Feed
        </Link>
      </li>
      <li className="item" />
      <li className="item" />
    </ul>
  </div>
);

export default Bar;
