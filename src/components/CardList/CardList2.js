import React, { useEffect, useState } from "react";
import { Modal, Carousel } from "antd";
import Glide from "@glidejs/glide";
import { Icon } from "antd";

import "./CardList.scss";
import "./Modal.scss";
import "./Carousel.scss";

const CardList2 = ({ data = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const sliders = document.querySelectorAll(".slider-post-two");
    for (const [index, item] of sliders.entries()) {
      new Glide(`.slider-post-two-${index}`, {
        gap: 0
      }).mount();
    }
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

  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        wrapClassName="modal-wrapper"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Carousel afterChange={onChange}>
          <div className="slide-item">
            <h3>1</h3>
          </div>
          <div className="slide-item">
            <h3>2</h3>
          </div>
          <div className="slide-item">
            <h3>3</h3>
          </div>
          <div className="slide-item">
            <h3>4</h3>
          </div>
        </Carousel>
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
