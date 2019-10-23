import React, { useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";
import * as R from "ramda";

import "./MapPanel.scss";

const MapPanel = ({ animal = {}, photos = [], local = {} }) => {
  const hasContent = !R.isEmpty(animal);

  const { breed = "", color = "", name = "", size = "" } = animal;
  const { comment = "", reference = "", street = "" } = local;

  useEffect(() => {
    if (hasContent) {
      new Glide(".slider", {
        gap: 0
      }).mount();
    }
  }, [animal]);

  return (
    <div
      className={classNames("map-panel", {
        "-active": hasContent
      })}
    >
      {hasContent ? (
        <>
          <div className="panel-content">
            <h1 className="title">{name}</h1>
            <p className="info breed">
              A raça do {name} é um <strong>{breed}</strong>
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

            <p className="comment">{comment}</p>

            <div className="block-content reference">
              <h3 className="subtitle">O ponto de referência</h3>
              <p className="paragraph">{reference}</p>
            </div>
            <div className="block-content street">
              <h3 className="subtitle">Último contato</h3>
              <p className="paragraph">{street}</p>
            </div>
          </div>

          <Link className="button help" to="/chat">
            Ajudar
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default MapPanel;
