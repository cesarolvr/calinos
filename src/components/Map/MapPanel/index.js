import React, { useEffect } from "react";
import classNames from "classnames";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";
import * as R from "ramda";

import "./MapPanel.scss";

const MapPanel = ({ animal = {}, photos = [], local = {}, ownerName, id }) => {
  const hasContent = !R.isEmpty(animal);

  const { breed = "", color = "", name = "", size = "", type = "" } = animal;
  const { comment = "" } = local;

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
            <div className="panel-header">
              <h1 className="title">{name}</h1>
              <Link className="to" to={`/publication/${id}`}>
                Ver post
                <Icon type="right" />
              </Link>
            </div>
            <p className="info type">
              {name} é um{" "}
              <strong>{type === "cat" ? "Gato" : "Cachorro"}</strong>
            </p>
            <p className="info breed">
              A raça do {name} é <strong>{breed}</strong>
            </p>
            <p className="info size">
              {name} é um animal de <strong>{size.toLowerCase()}</strong> porte
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

            <p className="info color">
              {name} é <strong>{color.toLowerCase()}</strong>
            </p>
            <p className="info size">
              <strong>{ownerName && ownerName.split(" ")[0]}</strong> é a pessoa responsável
              por {name}
            </p>

            <p className="comment">{comment}</p>
          </div>

          <Link className="button help" to={`/chat/${id}`}>
            Ajudar
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default MapPanel;
