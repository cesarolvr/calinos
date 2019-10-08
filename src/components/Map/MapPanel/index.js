import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import "./MapPanel.scss";

const MapPanel = ({ animal, photos }) => {
  const active = !!animal;
  if (!active) return null;

  const { breed, color, name, size } = animal;

  return (
    <div
      className={classNames("map-panel", {
        "-active": active
      })}
    >
      <h1>{name}</h1>
      <p>{breed}</p>
      <p>{size}</p>
      <p>{color}</p>
      {photos.map((photo, index) => (
        <img key={index} src={photo} />
      ))}

      <Link className="button" to="/chat">
        Ajudar
      </Link>
    </div>
  );
};

export default MapPanel;
