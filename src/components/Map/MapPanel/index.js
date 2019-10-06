import React from "react";
import classNames from "classnames";

import "./MapPanel.scss";

const MapPanel = ({ animal, photos, ...props }) => {
  const active = !!animal;
  if (!active) return null;
  return (
    <div
      className={classNames("map-panel", {
        "-active": active
      })}
    >
      {photos.map(photo => (
        <img src={photo} />
      ))}
    </div>
  );
};

export default MapPanel;
