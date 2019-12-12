import React, { useEffect } from "react";
import Glide from "@glidejs/glide";

import userPhoto from "../../assets/images/woman-user-photo.png";
import dogPhoto from "../../assets/images/dog-photo.png";

import "./CardList.scss";

import { Icon } from "antd";

const CardList1 = ({ data = [] }) => {
  useEffect(() => {
    const sliders = document.querySelectorAll(".slider-post");
    for (const [index, item] of sliders.entries()) {
      new Glide(`.slider-post-${index}`, {
        gap: 0
      }).mount();
    }
  }, []);
  return (
    <ul className="card-list">
      {data.map(
        (
          { ownerName = "", photos = [], postType = "", animal = {}, ...props },
          index
        ) => {
          console.log(props);

          return (
            <li className="item" key={index}>
              <div className="card-header">
                <div className="holder">
                  <div className="profile">
                    <img src={userPhoto} alt="" />
                  </div>
                </div>
                <div className="holder">
                  <div className="name">{ownerName}</div>
                  <div className="description">
                    <Icon type="environment" theme="filled" />
                    {animal.name || ""} foi passear de tarde
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="slider">
                  <div className={`slider-post slider-post-${index}`}>
                    <div data-glide-el="track" className="glide__track">
                      <ul className="glide__slides">
                        {[dogPhoto, dogPhoto].map((photo, index) => {
                          return (
                            <li className="glide__slide" key={index}>
                              {photos.map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo}
                                  className="image"
                                  // onClick={toggleLightbox}
                                />
                              ))}
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className="glide__bullets"
                        data-glide-el="controls[nav]"
                      >
                        {[dogPhoto, dogPhoto].map((item, index) => {
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
                </div>
                <div className="control">
                  <button className="button -gift">
                    Presentear {animal.name || ""}
                  </button>
                  <button className="button -ask">Perguntar sobre</button>
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default CardList1;
