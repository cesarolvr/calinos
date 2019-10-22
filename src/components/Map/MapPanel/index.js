import React, { useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";
import * as R from "ramda";

import "./MapPanel.scss";

const MapPanel = ({ animal = {}, photos = [] }) => {
  const hasContent = !R.isEmpty(animal);
  console.log(hasContent);

  const { breed = "", color = "", name = "", size = "" } = animal;

  useEffect(() => {
    if (hasContent) {
      new Glide(".slider", {
        gap: 0
      }).mount();
    }
  }, []);
  return (
    <div
      className={classNames("map-panel", {
        "-active": hasContent
      })}
    >
      {hasContent ? (
        <>
          <h1 className="title">{name}</h1>
          <p className="info breed">
            A raça do {name} é <strong>{breed}</strong>
          </p>
          <p className="info size">
            {name} é um animal de <strong>{size.toLowerCase()}</strong> porte
          </p>
          <p className="info color">
            {name} é <strong>{color.toLowerCase()}</strong>
          </p>
          <div className="slider">
            <div data-glide-el="track" className="glide__track">
              <ul className="glide__slides">
                {photos.map((photo, index) => (
                  <li className="glide__slide" key={index}>
                    <img src={photo} className="image" />
                  </li>
                ))}
              </ul>
              <div className="glide__bullets" data-glide-el="controls[nav]">
                {photos.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="glide__bullet"
                      data-glide-dir={`=${index}`}
                    ></button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="comment">
            O Fred fugiu da casa de sua dona Fernanda ontem por voltar das
            20h00, próximo à estação Santo Amaro do Metrô.
          </p>

          <Link className="button help" to="/chat">
            Ajudar
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default MapPanel;
