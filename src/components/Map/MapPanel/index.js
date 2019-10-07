import React from "react";
import classNames from "classnames";

import "./MapPanel.scss";

const MapPanel = ({ animal, photos }) => {
  const active = !!animal;
  if (!active) return null;
  return (
    <div
      className={classNames("map-panel", {
        "-active": active
      })}
    >
      {photos.map((photo, index) => (
        <img key={index} src={photo} />
      ))}
    </div>
  );
};

export default MapPanel;
