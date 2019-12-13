import React, { useEffect, useState } from "react";
import { Modal, Carousel } from "antd";
import Glide from "@glidejs/glide";
import { Icon } from "antd";
import classNames from "classnames";

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
          <div className="slide-item">
            <h3>Adoção e apadrinhamento de bichinhos</h3>
            <p>
              Eba! Ficamos muito felizes em saber que você tem interesse em
              adotar um bichinho! Mas, antes de começarmos, é importante deixar
              alguns pontos bem claros :)
            </p>
          </div>
          <div className="slide-item">
            <h3>Um bichinho é um filho. E dará trabalho como um.</h3>
            <p>
              Junto com todo amor que você receberá do seu bichinho adotado,
              virão também responsabilidades importantes. Cuidar de pet dá
              trabalho, mas é super bem recompensado!
            </p>
          </div>
          <div className="slide-item">
            <h3>É necessário saber sobre guarda resonsável.</h3>
            <p>
              Cuidados veterinários, alimentação, passeios e brincadeiras fazem
              parte de uma guarda responsável. Antes de adotar, é importante
              levar em conta sua rotina e condições financeiras para garantir o
              bem-estar do seu bichinho.
            </p>
          </div>
          <div className="slide-item">
            <h3>Saiba que adotar um bichinho não é uma brincadeira.</h3>
            <p>
              Adotar um bichinho é assumir uma responsabilidade durante toda a
              vida dele. A média de vida de um pet é de aproximadamente 14 anos.
              Então, tenha isso em mente e se planeje ao adotar!
            </p>
          </div>
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
