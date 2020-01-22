import React, { useEffect, useState } from "react";
import { Modal, Carousel } from "antd";
import Glide from "@glidejs/glide";
import { Icon } from "antd";
import classNames from "classnames";

import { adoptionInfo } from "../../consts/adoption";

import "./CardList.scss";
import "./Modal.scss";
import "./Carousel.scss";

import illustrations from "../../assets/images/illustration-track.svg";

const CardList2 = ({ data = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [carouselRef, setCarouselRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const sliders = document.querySelectorAll(".slider-post-two");
    for (const [index, item] of sliders.entries()) {
      new Glide(`.slider-post-two-${index}`, {
        gap: 0
      }).mount();
    }

    const carousel = React.createRef();
    setCarouselRef(carousel);
  }, []);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = e => {
    setModalVisible(!modalVisible);
  };

  const handleCancel = e => {
    setModalVisible(false);
  };

  const onChange = (from, to) => {
    setCurrentSlide(to);
  };
  return (
    <>
      <Modal
        wrapClassName={classNames(`modal-wrapper -current-${currentSlide}`)}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="illustration-track">
          <img src={illustrations} />
        </div>
        <Carousel beforeChange={onChange} ref={node => setCarouselRef(node)}>
          {
            adoptionInfo.map((item, i) => {
              return (
                <div className="slide-item" key={i}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )
            })
          }
        </Carousel>
        <button
          className="button-next"
          disabled={currentSlide === 3}
          onClick={() => carouselRef.next()}
        >
          {currentSlide === 3 ? "Continuar" : "Próximo"}
        </button>
      </Modal>
      <ul className="card-list -two">
        {data.map(
          (
            {
              ownerName = "",
              photos = [],
              postType = "",
              animal = {},
              local = {},
              ownerPhoto = "",
              lastActivity = {}
            },
            index
          ) => (
            <li className="item" key={index}>
              <div className="card-body">
                <div className="slider">
                  <div className={`slider-post-two slider-post-two-${index}`}>
                    <div data-glide-el="track" className="glide__track">
                      <ul className="glide__slides">
                        {photos.map((photo, index) => {
                          return (
                            <li className="glide__slide" key={index}>
                              <img src={photo} className="image" />
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className="glide__bullets"
                        data-glide-el="controls[nav]"
                      >
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
                </div>
                <div className="block-info">
                  <div className="block-info-header">
                    <div className="name">{animal.name || ""}</div>
                    <p className="share">
                      Compartilhar
                      <Icon type="share-alt" />
                    </p>
                  </div>
                  <div className="block-info-body">
                    <div className="info">
                      {animal.breed || ""}{" "}
                      {(animal.color && animal.color.toLowerCase()) || ""}
                      <Icon type="gitlab" theme="filled" />
                    </div>
                    <div className="info">
                      <Icon type="environment" theme="filled" />
                      {(local && local.street) || ""}
                    </div>
                  </div>
                  <button className="button" onClick={showModal}>
                    Adotar
                  </button>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default CardList2;
