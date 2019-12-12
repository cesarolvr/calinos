import React, { useEffect } from "react";
import Glide from "@glidejs/glide";

import userPhoto from "../../assets/images/woman-user-photo.png";
import dogPhoto from "../../assets/images/dog-photo.png";

import "./CardList.scss";

const CardList1 = () => {
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
      {[1, 2, 4, 5, 6].map((_, index) => (
        <li className="item" data-murphy="bottom-to-top" data-murphy-delay={400} key={index}>
          <div className="card-header">
            <div className="holder">
              <div className="profile">
                <img src={userPhoto} alt="" />
              </div>
            </div>
            <div className="holder">
              <div className="name">Maria Fernanda</div>
              <div className="description">
                Perdeu o <strong>Fred</strong> em Santo Amaro
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
                          <img
                            src={photo}
                            className="image"
                            // onClick={toggleLightbox}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="glide__bullets" data-glide-el="controls[nav]">
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
              <button className="button -gift">Presentear Fred</button>
              <button className="button -ask">Perguntar sobre Fred</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardList1;
