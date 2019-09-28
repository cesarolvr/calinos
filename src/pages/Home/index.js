import React from "react";

// Components
import Map from "../../components/Map";

import "./Home.scss";

const Home = () => {
  return (
    <div className="panel home">
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default Home;
