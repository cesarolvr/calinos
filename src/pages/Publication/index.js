import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "antd";
import Glide from "@glidejs/glide";

// Utils
import getGender from "../../utils/getGender";

// Firebase
import firebase from "firebase/app";

// Styles
import "./Publication.scss";

const Publication = () => {
  const { id = "" } = useParams();
  const [post, setPost] = useState({});

  const { animal = {}, ownerName = "", local = {}, photos = [] } = post;
  const { name = "", breed = "", color = "", gender = "" } = animal;
  const { comment = "" } = local;

  const getPost = () => {
    const databaseInstance = firebase.firestore();
    databaseInstance
      .collection("posts")
      .where("id", "==", id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            setPost(snapshot.data());
          }
        });
      })
      .catch(console.log);
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    new Glide(".slider", {
      gap: 0
    }).mount();
  }, [photos]);

  console.log(photos, post);

  return (
    <div className="publication">
      <div className="back"></div>
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
      <div className="content">
        <div className="header">
          <div className="title">{name}</div>
          <div className="share">
            Compartilhar
            <Icon type="share-alt" />
          </div>
        </div>
        <ul className="details-list">
          <li className="item">
            <Icon type="info-circle" />
            {name} é um {breed} {color.toLowerCase()}
          </li>
          <li className="item">
            <Icon type="info-circle" />
            Estação Santo Amaro
          </li>
          <li className="item">
            <Icon type="info-circle" />
            {ownerName.split(" ")[0]} é a pessoa responsável
          </li>
          <li className="item">
            <Icon type="info-circle" />
            {name} é {getGender(gender).toLowerCase()}
          </li>
        </ul>
        <p className="comment">{comment}</p>
        <div className="control">
          <button className="button">Ver discussão</button>
          <button className="button -call">Ligar para o dono</button>
        </div>
      </div>
    </div>
  );
};

export default Publication;
