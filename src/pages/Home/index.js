import React, { useState } from "react";
import classNames from "classnames";

// Components
import Map from "../../components/Map";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Home;
